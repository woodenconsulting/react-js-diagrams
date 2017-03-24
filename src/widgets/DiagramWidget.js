import React from 'react';
import _ from 'lodash';
import { PointModel, NodeModel, LinkModel, PortModel } from '../Common';
import { SelectingAction, MoveCanvasAction, MoveItemsAction } from './actions';
import { LinkLayerWidget } from './LinkLayerWidget';
import { NodeLayerWidget } from './NodeLayerWidget';

export class DiagramWidget extends React.Component {
  static defaultProps = {
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      action: null,
      actionType: 'unknown',
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
    const { diagramEngine, onChange } = this.props;
    diagramEngine.setCanvas(this.refs['canvas']);
    diagramEngine.setForceUpdate(this.forceUpdate.bind(this));

    // Add a keyboard listener
    this.setState({
      renderedNodes: true,
      windowListener: window.addEventListener('keydown', event => {
        // Delete all selected
        if(event.keyCode === 46 || event.keyCode === 8) {
          const selectedItems = _.filter(diagramEngine.getDiagramModel().getSelectedItems(), item => !(item instanceof PointModel));
          selectedItems.forEach(element => {
            element.remove();
          });
          onChange(diagramEngine.getDiagramModel().serializeDiagram(), { type: 'selections-deleted', items: selectedItems });
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
    const { left, top } = this.refs.canvas.getBoundingClientRect();

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
      this.setState({ action, actionType: 'items-drag-selected' });
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

      // Determine actionType
      let actionType = 'items-moved';
      if (action.selectionModels.length === 1 && action.selectionModels[0].model instanceof NodeModel) {
        actionType = 'node-moved';
      }

      this.setState({ actionType });
    } else if (this.state.action instanceof MoveCanvasAction) {
      // Translate the actual canvas
      diagramModel.setOffset(
        action.initialOffsetX + (
          (event.pageX - left - this.state.action.mouseX) / (diagramModel.getZoomLevel() / 100)
        ),
        action.initialOffsetY + (
          (event.pageY - top - this.state.action.mouseY) / (diagramModel.getZoomLevel() / 100)
        )
      );
      this.setState({ action, actionType: 'canvas-drag' });
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
          ),
          actionType: 'canvas-shift-select'
        });
      } else {
        // This is a drag canvas event
        const relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);
        diagramModel.clearSelection();

        this.setState({
          action: new MoveCanvasAction(relative.x, relative.y, diagramModel),
          actionType: 'canvas-click'
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
        action: new MoveItemsAction(event.pageX, event.pageY, diagramEngine),
        actionType: 'link-created'
      });
    } else {
      // It's a direct click selection
      let deselect = false;

      // Clear selections if this wasn't a shift key or a click on a selected element
      if (!event.shiftKey && !model.model.isSelected()) {
        diagramModel.clearSelection(false, true);
      }

      // Is this a deselect or select?
      if (event.shiftKey && model.model.isSelected()) {
        model.model.setSelected(false);
        deselect = true;
      } else {
        model.model.setSelected(true);
        diagramModel.nodeSelected(model);
      }

      // Get the selected items and filter out point model
      const selected = _.filter(diagramEngine.getDiagramModel().getSelectedItems(), item => !(item instanceof PointModel));

      // Determine action type
      let actionType = 'items-selected';
      if (deselect && model.model instanceof LinkModel) {
        actionType = 'link-deselected';
      } else if (deselect && model.model instanceof NodeModel) {
        actionType = 'node-deselected';
      } else if (selected.length === 1 && selected[0] instanceof LinkModel) {
        actionType = 'link-selected';
      } else if (selected.length === 1 && selected[0] instanceof NodeModel) {
        actionType = 'node-selected';
      }

      this.setState({
        action: new MoveItemsAction(event.pageX, event.pageY, diagramEngine),
        actionType
      });
    }
  }

  onMouseUp(event) {
    const  { diagramEngine, onChange } = this.props;
    const { action, actionType } = this.state;
    const element = this.getMouseElement(event);
    const actionOutput = {
      type: actionType
    };

    if (element === null) {
      // No element, this is a canvas event
      // actionOutput.type = 'canvas-event';
      actionOutput.event = event;
    } else if (action instanceof MoveItemsAction) {
      // Add the node model to the output
      actionOutput.model = element.model;

      // Check if we going to connect a link to something
      action.selectionModels.forEach(model => {
        // Only care about points connecting to things
        if (!(model.model instanceof PointModel)) {
          return;
        }

        // A point was created
        if (element.element.tagName === 'circle' && actionOutput.type !== 'link-created') {
          actionOutput.type = 'point-created';
        }

        if (element.model instanceof PortModel) {
          // Connect the link
          model.model.getLink().setTargetPort(element.model);

          // Link was connected to a port, update the output
          actionOutput.type = 'link-connected';
          delete actionOutput.model;
          actionOutput.linkModel = model.model.getLink();
          actionOutput.portModel = element.model;
        }
      });
    }

    const attachItems = ['items-selected', 'items-drag-selected', 'items-moved', 'node-deselected', 'link-deselected'];
    if (attachItems.indexOf(actionType) !== -1) {
      actionOutput.items = _.filter(diagramEngine.getDiagramModel().getSelectedItems(), item => !(item instanceof PointModel));
    }
    if (actionType === 'items-moved') {
      delete actionOutput.model;
    }

    diagramEngine.clearRepaintEntities();
    if (actionOutput.type !== 'unknown') {
      onChange(diagramEngine.getDiagramModel().serializeDiagram(), actionOutput);
    }
    this.setState({ action: null, actionType: 'unknown' });
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
    const offsetWidth = this.refs.canvas && this.refs.canvas.offsetWidth || window.innerWidth;
    const offsetHeight = this.refs.canvas && this.refs.canvas.offsetHeight || window.innerHeight;

    if (!(action instanceof SelectingAction)) {
      return null;
    }

    const style = {
      width: Math.abs(action.mouseX2 - action.mouseX),
      height: Math.abs(action.mouseY2 - action.mouseY),
    };

    if ((action.mouseX2 - action.mouseX) < 0) {
      style.right = offsetWidth - action.mouseX;
    } else {
      style.left = action.mouseX;
    }

    if ((action.mouseY2 - action.mouseY) < 0) {
      style.bottom = offsetHeight - action.mouseY;
    } else {
      style.top = action.mouseY;
    }

    return (
      <div
        className='selector'
        style={style}
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
