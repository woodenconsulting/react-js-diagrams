import _ from 'lodash';
import { NodeModel, PointModel, LinkModel } from './Common';
import { BaseEntity } from './BaseEntity';
import { DiagramModel } from './DiagramModel';

/**
 * Passed as a parameter to the DiagramWidget
 */
export class DiagramEngine extends BaseEntity {
  constructor() {
    super();
    this.diagramModel = new DiagramModel();
    this.nodeFactories = {};
    this.linkFactories = {};
    this.instanceFactories = {};
    this.linkInstanceFactory = null;
    this.canvas = null;
    this.paintableWidgets = null;
    this.forceUpdate = () => {};
  }

  clearRepaintEntities() {
    this.paintableWidgets = null;
  }

  enableRepaintEntities(entities) {
    this.paintableWidgets = {};
    entities.forEach(entity => {
      // If a node is requested to repaint, add all of its links
      if (entity instanceof NodeModel) {
        _.forEach(entity.getPorts(), port => {
          _.forEach(port.getLinks(), link => {
            this.paintableWidgets[link.getID()] = true;
          });
        });
      }

      if (entity instanceof PointModel) {
        this.paintableWidgets[entity.getLink().getID()] = true;
      }

      this.paintableWidgets[entity.getID()] = true;
    });
  }

  canEntityRepaint(baseModel) {
    // No rules applied, allow repaint
    if (this.paintableWidgets === null) {
      return true;
    }

    return this.paintableWidgets[baseModel.getID()] !== undefined;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setDiagramModel(model) {
    this.diagramModel = model;
  }

  setForceUpdate(forceUpdate) {
    this.forceUpdate = forceUpdate;
  }

  getDiagramModel() {
    return this.diagramModel;
  }

  getNodeFactories() {
    return this.nodeFactories;
  }

  getLinkFactories() {
    return this.linkFactories;
  }

  getInstanceFactory(className) {
    return this.instanceFactories[className];
  }

  registerInstanceFactory(factory) {
    this.instanceFactories[factory.getName()] = factory;
    // Check for a link instance factory to be used when creating new links via drag
    if (factory.getInstance() instanceof LinkModel) {
      this.linkInstanceFactory = factory;
    }
  }

  registerNodeFactory(factory) {
    this.nodeFactories[factory.getType()] = factory;
    this.itterateListeners(listener => {
      listener.nodeFactoriesUpdated();
    });
  }

  registerLinkFactory(factory) {
    this.linkFactories[factory.getType()] = factory;
    this.itterateListeners(listener => {
      listener.linkFactoriesUpdated();
    });
  }

  getFactoryForNode(node) {
    if (this.nodeFactories[node.getType()]) {
      return this.nodeFactories[node.getType()];
    }
    console.log(`Cannot find widget factory for node of type: [${node.getType()}]`); // eslint-disable-line
    return null;
  }

  getFactoryForLink(link) {
    if (this.linkFactories[link.getType()]) {
      return this.linkFactories[link.getType()];
    }
    console.log(`Cannot find widget factory for link of type: [${link.getType()}]`); // eslint-disable-line
    return null;
  }

  generateWidgetForLink(link) {
    const linkFactory = this.getFactoryForLink(link);
    if (!linkFactory) {
      throw `Cannot find link factory for link: ${link.getType()}`;
    }
    return linkFactory.generateReactWidget(this, link);
  }

  generateWidgetForNode(node) {
    const nodeFactory = this.getFactoryForNode(node);
    if (!nodeFactory) {
      throw `Cannot find widget factory for node: ${node.getType()}`;
    }
    return nodeFactory.generateReactWidget(this, node);
  }

  getRelativeMousePoint(event) {
    const point = this.getRelativePoint(event.pageX, event.pageY);
    return {
      x: (point.x / (this.diagramModel.getZoomLevel() / 100.0)) - this.diagramModel.getOffsetX(),
      y: (point.y / (this.diagramModel.getZoomLevel() / 100.0)) - this.diagramModel.getOffsetY()
    };
  }

  getRelativePoint(x, y) {
    const canvasRect = this.canvas.getBoundingClientRect();
    return { x: x - canvasRect.left, y: y - canvasRect.top };
  }

  getNodePortElement(port) {
    const selector = this.canvas.querySelector(
      `.port[data-name="${port.getName()}"][data-nodeid="${port.getParent().getID()}"]`
    );
    if (selector === null) {
      throw `Cannot find Node Port element with nodeID: [${port.getParent().getID()}] and name: [${port.getName()}]`;
    }
    return selector;
  }

  getPortCenter(port) {
    const sourceElement = this.getNodePortElement(port);
    const sourceRect = sourceElement.getBoundingClientRect();
    const rel = this.getRelativePoint(sourceRect.left,sourceRect.top);
    const x = (sourceElement.offsetWidth / 2) + rel.x / (this.diagramModel.getZoomLevel() / 100.0) -
      this.diagramModel.getOffsetX();
    const y = (sourceElement.offsetHeight / 2) + rel.y / (this.diagramModel.getZoomLevel() / 100.0) -
      this.diagramModel.getOffsetY();

    return {
      x,
      y
    };
  }
}
