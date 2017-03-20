import React from 'react';
import _ from 'lodash';
import { PointModel, NodeModel, LinkModel, PortModel } from '../Common';
import { SelectingAction, MoveCanvasAction, MoveItemsAction } from './actions';
import { LinkLayerWidget } from './LinkLayerWidget';
import { NodeLayerWidget } from './NodeLayerWidget';

export class DiagramWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      renderedNodes: false,
      windowListener: null
    };
  }

  componentWillUnmount(){
    this.props.diagramEngine.setCanvas(null);
    window.removeEventListener('keydown', this.state.windowListener);
  }

  componentWillUpdate(nextProps) {
    if (this.props.diagramEngine.diagramModel.id !== nextProps.diagramEngine.diagramModel.id) {
      this.setState({ renderedNodes: false });
      nextProps.diagramEngine.diagramModel.rendered = true;
    }
    if (!nextProps.diagramEngine.diagramModel.rendered) {
      this.setState({ renderedNodes: false });
      nextProps.diagramEngine.diagramModel.rendered = true;
    }
  }

  componentDidUpdate() {
    if (!this.state.renderedNodes) {
      this.setState({
        renderedNodes: true
      });
    }
  }

  componentDidMount() {
    const { diagramEngine } = this.props;
    diagramEngine.setCanvas(this.refs['canvas']);
    diagramEngine.setForceUpdate(this.forceUpdate.bind(this));

    // Add a keyboard listener
    this.setState({
      renderedNodes: true,
      windowListener: window.addEventListener('keydown', event => {
        // Delete all selected
        if(event.keyCode === 46 || event.keyCode === 8) {
          diagramEngine.getDiagramModel().getSelectedItems().forEach(element => {
            element.remove();
          });
          this.forceUpdate();
        }
      })
    });
    window.focus();
  }

  /**
   * Gets a model and element under the mouse cursor
   */
  getMouseElement(event) {
    const { diagramModel } = this.props.diagramEngine;
    const { target } = event;

    // Look for a port
    let element = target.closest('.port[data-name]');
    if (element) {
      const nodeElement = target.closest('.node[data-nodeid]');
      return {
        model: diagramModel.getNode(nodeElement.getAttribute('data-nodeid')).getPort(element.getAttribute('data-name')),
        element
      };
    }

    // Look for a point
    element = target.closest('.point[data-id]');
    if (element) {
      return {
        model: diagramModel.getLink(element.getAttribute('data-linkid')).getPointModel(element.getAttribute('data-id')),
        element
      };
    }

    // Look for a link
    element = target.closest('[data-linkid]');
    if (element) {
      return {
        model: diagramModel.getLink(element.getAttribute('data-linkid')),
        element
      };
    }

    // Look for a node
    element = target.closest('.node[data-nodeid]');
    if (element) {
      return {
        model: diagramModel.getNode(element.getAttribute('data-nodeid')),
        element
      };
    }

    return null;
  }

  onWheel(event) {
    const  { diagramEngine } = this.props;
    const diagramModel = diagramEngine.getDiagramModel();
    event.preventDefault();
    event.stopPropagation();
    diagramModel.setZoomLevel(diagramModel.getZoomLevel() + (event.deltaY / 60));
    diagramEngine.enableRepaintEntities([]);
    this.forceUpdate();
  }

  onMouseMove(event) {
    const  { diagramEngine } = this.props;
    const { action } = this.state;
    const diagramModel = diagramEngine.getDiagramModel();

    // Select items so draw a bounding box
    if (action instanceof SelectingAction) {
      const relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);

      _.forEach(diagramModel.getNodes(), node => {
        if (action.containsElement(node.x, node.y, diagramModel)) {
          node.setSelected(true);
        }
      });

      _.forEach(diagramModel.getLinks(), link => {
        let allSelected = true;
        link.points.forEach(point => {
          if (action.containsElement(point.x, point.y, diagramModel)) {
            point.setSelected(true);
          } else {
            allSelected = false;
          }
        });

        if (allSelected) {
          link.setSelected(true);
        }
      });

      action.mouseX2 = relative.x;
      action.mouseY2 = relative.y;
      this.setState({ action });
      return;
    } else if (action instanceof MoveItemsAction) {
      // Translate the items on the canvas
      action.selectionModels.forEach(model => {
        if (model.model instanceof NodeModel || model.model instanceof PointModel) {
          model.model.x = model.initialX + (
            (event.pageX - this.state.action.mouseX) / (diagramModel.getZoomLevel() / 100)
          );
          model.model.y = model.initialY + (
            (event.pageY - this.state.action.mouseY) / (diagramModel.getZoomLevel() / 100)
          );
        }
      });
      this.forceUpdate();
    } else if (this.state.action instanceof MoveCanvasAction) {
      // Translate the actual canvas
      diagramModel.setOffset(
        action.initialOffsetX + (
          (event.pageX - this.state.action.mouseX) / (diagramModel.getZoomLevel() / 100)
        ),
        action.initialOffsetY + (
          (event.pageY-this.state.action.mouseY) / (diagramModel.getZoomLevel() / 100)
        )
      );
      this.forceUpdate();
    }
  }

  onMouseDown(event) {
    const  { diagramEngine } = this.props;
    const diagramModel = diagramEngine.getDiagramModel();
    const model = this.getMouseElement(event);

    diagramEngine.clearRepaintEntities();

    // Check if this is the canvas
    if (model === null) {
      // Check for a multiple selection
      if (event.shiftKey) {
        const relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);
        this.setState({
          action: new SelectingAction(
            relative.x, relative.y
          )
        });
      } else {
        // This is a drag canvas event
        const relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);
        diagramModel.clearSelection();
        this.setState({
          action: new MoveCanvasAction(relative.x, relative.y, diagramModel)
        });
      }
    } else if (model.model instanceof PortModel) {
      // This is a port element, we want to drag a link
      const relative = diagramEngine.getRelativeMousePoint(event);
      const link = new LinkModel();
      link.setSourcePort(model.model);

      link.getFirstPoint().updateLocation(relative);
      link.getLastPoint().updateLocation(relative);

      diagramModel.clearSelection();
      link.getLastPoint().setSelected(true);
      diagramModel.addLink(link);

      this.setState({
        action: new MoveItemsAction(event.pageX, event.pageY, diagramEngine)
      });
    } else {
      // It's some other element that needs to be moved
      if (!event.shiftKey && !model.model.isSelected()) {
        diagramModel.clearSelection();
      }
      model.model.setSelected(true);

      this.setState({
        action: new MoveItemsAction(event.pageX, event.pageY,diagramEngine)
      });
    }
  }

  onMouseUp(event) {
    const  { diagramEngine } = this.props;

    // Check if we going to connect a link to something
    if (this.state.action instanceof MoveItemsAction) {
      const element = this.getMouseElement(event);
      if (element) {
        this.state.action.selectionModels.forEach(model => {
          // Only care about points connecting to things
          if (!(model.model instanceof PointModel)) {
            return;
          }

          if (element.model instanceof PortModel) {
            model.model.getLink().setTargetPort(element.model);
          }
        });
      }
    }

    diagramEngine.clearRepaintEntities();
    this.setState({ action: null });
  }

  renderLinkLayerWidget() {
    const  { diagramEngine } = this.props;
    const diagramModel = diagramEngine.getDiagramModel();

    if (!this.state.renderedNodes) {
      return null;
    }

    return (
      <LinkLayerWidget
        diagramEngine={diagramEngine}
        pointAdded={(point, event) => {
          event.stopPropagation();
          diagramModel.clearSelection(point);
          this.setState({
            action: new MoveItemsAction(event.pageX, event.pageY, diagramEngine)
          });
        }}
      />
    );
  }

  renderSelector() {
    const { action } = this.state;

    if (!(action instanceof SelectingAction)) {
      return null;
    }

    return (
      <div
        className='selector'
        style={{
          top: action.mouseY,
          left: action.mouseX,
          width: action.mouseX2 - action.mouseX,
          height: action.mouseY2 - action.mouseY,
        }}
      />
    );
  }

  render() {
    const  { diagramEngine } = this.props;

    return (
      <div
        ref='canvas'
        className='react-js-diagrams-canvas'
        onWheel={this.onWheel.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
      >
        {this.renderLinkLayerWidget()}
        <NodeLayerWidget diagramEngine={diagramEngine} />
        {this.renderSelector()}
      </div>
    );
  }
}
