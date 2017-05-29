import _ from 'lodash';
import { BaseEntity } from './BaseEntity';

export class BaseModel extends BaseEntity {
  constructor() {
    super();
    this.selected = false;
  }

  deSerialize(ob) {
    super.deSerialize(ob);
    this.selected = ob.selected;
  }

  serialize() {
    return {
      ...super.serialize(),
      _class: this.constructor.name,
      selected: this.selected
    };
  }

  getID() {
    return this.id;
  }

  isSelected() {
    return this.selected;
  }

  setSelected(selected) {
    this.selected = selected;
    this.itterateListeners(listener => {
      if (listener.selectionChanged) {
        listener.selectionChanged(this, selected);
      }
    });
  }

  remove() {
    this.itterateListeners(listener => {
      if (listener.entityRemoved) {
        listener.entityRemoved(this);
      }
    });
  }
}

export class PointModel extends BaseModel {
  constructor(link, points) {
    super();
    this.x = points.x;
    this.y = points.y;
    this.link = link;
  }

  deSerialize(ob) {
    super.deSerialize(ob);
    this.x = ob.x;
    this.y = ob.y;
  }

  serialize() {
    return {
      ...super.serialize(),
      x: this.x,
      y: this.y
    };
  }

  remove() {
    super.remove();

    // Clear references
    if (this.link) {
      this.link.removePoint(this);
    }
  }

  updateLocation(points) {
    this.x = points.x;
    this.y = points.y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getLink() {
    return this.link;
  }
}

export class LinkModel extends BaseModel {
  constructor(linkType = 'default') {
    super();
    this.linkType = linkType;
    this.points = this.getDefaultPoints();
    this.extras = {};
    this.sourcePort = null;
    this.targetPort = null;
  }

  deSerialize(ob) {
    super.deSerialize(ob);
    this.linkType = ob.type;
    this.points = ob.points.map(point => {
      var p = new PointModel(this, { x: point.x, y:point.y });
      p.deSerialize(point);
      return p;
    });
  }

  serialize() {
    return {
      ...super.serialize(),
      type: this.linkType,
      source: this.sourcePort ? this.sourcePort.getParent().id : null,
      sourcePort: this.sourcePort ? this.sourcePort.id : null,
      target: this.targetPort ? this.targetPort.getParent().id : null,
      targetPort: this.targetPort ? this.targetPort.id : null,
      points: this.points.map(point => point.serialize()),
      extras: this.extras
    };
  }

  remove() {
    super.remove();
    if (this.sourcePort) {
      this.sourcePort.removeLink(this);
    }
    if (this.targetPort) {
      this.targetPort.removeLink(this);
    }
  }

  isLastPoint(point) {
    return this.getPointIndex(point) === this.points.length - 1;
  }

  getDefaultPoints() {
    return [
      new PointModel(this,{ x: 0, y: 0 }),
      new PointModel(this,{ x: 0, y: 0 }),
    ];
  }

  getPointIndex(point) {
    return this.points.indexOf(point);
  }

  getPointModel(id) {
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i].id === id) {
        return this.points[i];
      }
    }
    return null;
  }

  getFirstPoint() {
    return this.points[0];
  }

  getLastPoint() {
    return this.points[this.points.length - 1];
  }

  setSourcePort(port) {
    port.addLink(this);
    this.sourcePort = port;
  }

  getSourcePort() {
    return this.sourcePort;
  }

  getTargetPort() {
    return this.targetPort;
  }

  setTargetPort(port) {
    port.addLink(this);
    this.targetPort = port;
  }

  getPoints() {
    return this.points;
  }

  setPoints(points) {
    this.points = points;
  }

  removePoint(pointModel) {
    this.points.splice(this.getPointIndex(pointModel), 1);
  }

  addPoint(pointModel, index = 1) {
    this.points.splice(index, 0, pointModel);
  }

  getType() {
    return this.linkType;
  }
}

export class PortModel extends BaseModel {
  constructor(name) {
    super();
    this.name = name;
    this.links = {};
    this.parentNode = null;
  }

  deSerialize(ob) {
    super.deSerialize(ob);
    this.name = ob.name;
  }

  serialize() {
    return {
      ...super.serialize(),
      name: this.name,
      parentNode: this.parentNode.id,
      links: _.map(this.links, link => link.id)
    };
  }

  getName() {
    return this.name;
  }

  getParent() {
    return this.parentNode;
  }

  setParentNode(node) {
    this.parentNode = node;
  }

  removeLink(link) {
    delete this.links[link.getID()];
  }

  addLink(link) {
    this.links[link.getID()] = link;
  }

  getLinks() {
    return this.links;
  }
}

export class NodeModel extends BaseModel {
  constructor(nodeType = 'default') {
    super();
    this.nodeType = nodeType;
    this.x = 0;
    this.y = 0;
    this.extras = {};
    this.ports = {};
  }

  deSerialize(ob) {
    super.deSerialize(ob);
    this.nodeType = ob.type;
    this.x = ob.x;
    this.y = ob.y;
    this.extras = ob.extras;
  }

  serialize() {
    return {
      ...super.serialize(),
      type: this.nodeType,
      x: this.x,
      y: this.y,
      extras: this.extras,
      ports: _.map(this.ports, port => port.serialize())
    };
  }

  remove() {
    super.remove();
    for (const key in this.ports) {
      _.forEach(this.ports[key].getLinks(), link => link.remove());
    }
  }

  getPortFromID(id) {
    for (const key in this.ports) {
      if (this.ports[key].id === id) {
        return this.ports[key];
      }
    }
    return null;
  }

  getPort(name) {
    return this.ports[name];
  }

  getPorts() {
    return this.ports;
  }

  removePort(port) {
    // Clear the parent node reference
    if (this.ports[port.name]) {
      this.ports[port.name].setParentNode(null);
      delete this.ports[port.name];
    }
  }

  addPort(port) {
    port.setParentNode(this);
    this.ports[port.name] = port;
    return port;
  }

  getType() {
    return this.nodeType;
  }
}
