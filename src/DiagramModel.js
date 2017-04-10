import _ from 'lodash';
import { LinkModel, NodeModel } from './Common';
import { BaseEntity } from './BaseEntity';

export class DiagramModel extends BaseEntity {
  constructor() {
    super();
    this.links = {};
    this.nodes = {};
    this.offsetX = 0;
    this.offsetY = 0;
    this.zoom = 100;
    this.rendered = false;
  }

  deSerializeDiagram(object, diagramEngine) {
    this.deSerialize(object);
    this.offsetX = object.offsetX;
    this.offsetY = object.offsetY;
    this.zoom = object.zoom;

    // Deserialize nodes
    _.forEach(object.nodes, node => {
      const nodeOb = diagramEngine.getInstanceFactory(node._class).getInstance();
      nodeOb.deSerialize(node);

      // Deserialize ports
      _.forEach(node.ports, port => {
        const portOb = diagramEngine.getInstanceFactory(port._class).getInstance();
        portOb.deSerialize(port);
        nodeOb.addPort(portOb);
      });

      this.addNode(nodeOb);
    });

    // Attach ports
    _.forEach(object.links, link => {
      const linkOb = diagramEngine.getInstanceFactory(link._class).getInstance();
      linkOb.deSerialize(link);

      if (link.target) {
        linkOb.setTargetPort(this.getNode(link.target).getPortFromID(link.targetPort));
      }

      if (link.source) {
        linkOb.setSourcePort(this.getNode(link.source).getPortFromID(link.sourcePort));
      }

      this.addLink(linkOb);
    });
  }

  serializeDiagram() {
    return {
      ...this.serialize(),
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      zoom: this.zoom,
      links: _.map(this.links, link => link.serialize()),
      nodes: _.map(this.nodes, link => link.serialize())
    };
  }

  clearSelection(ignore, supressListener) {
    _.forEach(this.getSelectedItems(), element => {
      if (ignore && ignore.getID() === element.getID()) {
        return;
      }
      element.setSelected(false); //TODO dont fire the listener
    });
    if (supressListener) {
      return;
    }
    this.itterateListeners(listener => {
      if (listener.selectionCleared) {
        listener.selectionCleared();
      }
    });
  }

  getSelectedItems() {
    return [
      // Nodes
      ..._.filter(this.nodes, node => node.isSelected()),
      // Points
      ..._.filter(_.flatMap(this.links, node => node.points), port => port.isSelected()),
      // Links
      ..._.filter(this.links, link => link.isSelected())
    ];
  }

  setZoomLevel(zoom) {
    this.zoom = zoom;
    this.itterateListeners(listener => {
      if (listener.controlsUpdated) {
        listener.controlsUpdated();
      }
    });
  }

  setOffset(offsetX, offsetY) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.itterateListeners(listener => {
      if (listener.controlsUpdated) {
        listener.controlsUpdated();
      }
    });
  }

  setOffsetX(offsetX) {
    this.offsetX = offsetX;
    this.itterateListeners(listener => {
      if (listener.controlsUpdated) {
        listener.controlsUpdated();
      }
    });
  }

  setOffsetY(offsetY) {
    this.offsetX = offsetY;
    this.itterateListeners(listener => {
      if (listener.controlsUpdated) {
        listener.controlsUpdated();
      }
    });
  }

  getOffsetY() {
    return this.offsetY;
  }

  getOffsetX() {
    return this.offsetX;
  }

  getZoomLevel() {
    return this.zoom;
  }

  getNode(node) {
    if (node instanceof NodeModel) {
      return node;
    }
    if (!this.nodes[node]) {
      return null;
    }
    return this.nodes[node];
  }

  getLink(link) {
    if (link instanceof LinkModel) {
      return link;
    }
    if (!this.links[link]) {
      return null;
    }
    return this.links[link];
  }

  addLink(link) {
    link.addListener({
      entityRemoved: () => {
        this.removeLink(link);
      }
    });
    this.links[link.getID()] = link;
    this.itterateListeners(listener => {
      if (listener.linksUpdated) {
        listener.linksUpdated();
      }
    });
    return link;
  }

  addNode(node) {
    node.addListener({
      entityRemoved: () => {
        this.removeNode(node);
      }
    });
    this.nodes[node.getID()] = node;
    this.itterateListeners(listener => {
      if (listener.nodesUpdated) {
        listener.nodesUpdated();
      }
    });
    return node;
  }

  removeLink(link) {
    if (link instanceof LinkModel) {
      delete this.links[link.getID()];
      this.itterateListeners(listener => {
        if (listener.linksUpdated) {
          listener.linksUpdated();
        }
      });
      return;
    }
    delete this.links[_.toString(link)];
    this.itterateListeners(listener => {
      if (listener.linksUpdated) {
        listener.linksUpdated();
      }
    });
  }

  removeNode(node) {
    if (node instanceof NodeModel) {
      delete this.nodes[node.getID()];
      this.itterateListeners(listener => {
        if (listener.nodesUpdated) {
          listener.nodesUpdated();
        }
      });
      return;
    }

    delete this.nodes[_.toString(node)];
    this.itterateListeners(listener => {
      if (listener.nodesUpdated) {
        listener.nodesUpdated();
      }
    });
  }

  nodeSelected(node) {
    this.itterateListeners(listener => {
      if (listener.selectionChanged) {
        listener.selectionChanged(node);
      }
    });
  }

  getLinks() {
    return this.links;
  }

  getNodes() {
    return this.nodes;
  }
}
