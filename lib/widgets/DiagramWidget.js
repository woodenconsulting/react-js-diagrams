'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiagramWidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Common = require('../Common');

var _actions = require('./actions');

var _LinkLayerWidget = require('./LinkLayerWidget');

var _NodeLayerWidget = require('./NodeLayerWidget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiagramWidget = exports.DiagramWidget = function (_React$Component) {
  _inherits(DiagramWidget, _React$Component);

  function DiagramWidget(props) {
    _classCallCheck(this, DiagramWidget);

    var _this = _possibleConstructorReturn(this, (DiagramWidget.__proto__ || Object.getPrototypeOf(DiagramWidget)).call(this, props));

    _this.state = {
      action: null,
      renderedNodes: false,
      windowListener: null
    };
    return _this;
  }

  _createClass(DiagramWidget, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.diagramEngine.setCanvas(null);
      window.removeEventListener('keydown', this.state.windowListener);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.props.diagramEngine.diagramModel.id !== nextProps.diagramEngine.diagramModel.id) {
        this.setState({ renderedNodes: false });
        nextProps.diagramEngine.diagramModel.rendered = true;
      }
      if (!nextProps.diagramEngine.diagramModel.rendered) {
        this.setState({ renderedNodes: false });
        nextProps.diagramEngine.diagramModel.rendered = true;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.state.renderedNodes) {
        this.setState({
          renderedNodes: true
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var diagramEngine = this.props.diagramEngine;

      diagramEngine.setCanvas(this.refs['canvas']);
      diagramEngine.setForceUpdate(this.forceUpdate.bind(this));

      // Add a keyboard listener
      this.setState({
        renderedNodes: true,
        windowListener: window.addEventListener('keydown', function (event) {
          // Delete all selected
          if (event.keyCode === 46 || event.keyCode === 8) {
            diagramEngine.getDiagramModel().getSelectedItems().forEach(function (element) {
              element.remove();
            });
            _this2.forceUpdate();
          }
        })
      });
      window.focus();
    }

    /**
     * Gets a model and element under the mouse cursor
     */

  }, {
    key: 'getMouseElement',
    value: function getMouseElement(event) {
      var diagramModel = this.props.diagramEngine.diagramModel;
      var target = event.target;

      // Look for a port

      var element = target.closest('.port[data-name]');
      if (element) {
        var nodeElement = target.closest('.node[data-nodeid]');
        return {
          model: diagramModel.getNode(nodeElement.getAttribute('data-nodeid')).getPort(element.getAttribute('data-name')),
          element: element
        };
      }

      // Look for a point
      element = target.closest('.point[data-id]');
      if (element) {
        return {
          model: diagramModel.getLink(element.getAttribute('data-linkid')).getPointModel(element.getAttribute('data-id')),
          element: element
        };
      }

      // Look for a link
      element = target.closest('[data-linkid]');
      if (element) {
        return {
          model: diagramModel.getLink(element.getAttribute('data-linkid')),
          element: element
        };
      }

      // Look for a node
      element = target.closest('.node[data-nodeid]');
      if (element) {
        return {
          model: diagramModel.getNode(element.getAttribute('data-nodeid')),
          element: element
        };
      }

      return null;
    }
  }, {
    key: 'onWheel',
    value: function onWheel(event) {
      var diagramEngine = this.props.diagramEngine;

      var diagramModel = diagramEngine.getDiagramModel();
      event.preventDefault();
      event.stopPropagation();
      diagramModel.setZoomLevel(diagramModel.getZoomLevel() + event.deltaY / 60);
      diagramEngine.enableRepaintEntities([]);
      this.forceUpdate();
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var _this3 = this;

      var diagramEngine = this.props.diagramEngine;
      var action = this.state.action;

      var diagramModel = diagramEngine.getDiagramModel();

      // Select items so draw a bounding box
      if (action instanceof _actions.SelectingAction) {
        var relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);

        _lodash2.default.forEach(diagramModel.getNodes(), function (node) {
          if (action.containsElement(node.x, node.y, diagramModel)) {
            node.setSelected(true);
          }
        });

        _lodash2.default.forEach(diagramModel.getLinks(), function (link) {
          var allSelected = true;
          link.points.forEach(function (point) {
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
        this.setState({ action: action });
        return;
      } else if (action instanceof _actions.MoveItemsAction) {
        // Translate the items on the canvas
        action.selectionModels.forEach(function (model) {
          if (model.model instanceof _Common.NodeModel || model.model instanceof _Common.PointModel) {
            model.model.x = model.initialX + (event.pageX - _this3.state.action.mouseX) / (diagramModel.getZoomLevel() / 100);
            model.model.y = model.initialY + (event.pageY - _this3.state.action.mouseY) / (diagramModel.getZoomLevel() / 100);
          }
        });
        this.forceUpdate();
      } else if (this.state.action instanceof _actions.MoveCanvasAction) {
        // Translate the actual canvas
        diagramModel.setOffset(action.initialOffsetX + (event.pageX - this.state.action.mouseX) / (diagramModel.getZoomLevel() / 100), action.initialOffsetY + (event.pageY - this.state.action.mouseY) / (diagramModel.getZoomLevel() / 100));
        this.forceUpdate();
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {
      var diagramEngine = this.props.diagramEngine;

      var diagramModel = diagramEngine.getDiagramModel();
      var model = this.getMouseElement(event);

      diagramEngine.clearRepaintEntities();

      // Check if this is the canvas
      if (model === null) {
        // Check for a multiple selection
        if (event.shiftKey) {
          var relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);
          this.setState({
            action: new _actions.SelectingAction(relative.x, relative.y)
          });
        } else {
          // This is a drag canvas event
          var _relative = diagramEngine.getRelativePoint(event.pageX, event.pageY);
          diagramModel.clearSelection();
          this.setState({
            action: new _actions.MoveCanvasAction(_relative.x, _relative.y, diagramModel)
          });
        }
      } else if (model.model instanceof _Common.PortModel) {
        // This is a port element, we want to drag a link
        var _relative2 = diagramEngine.getRelativeMousePoint(event);
        var link = new _Common.LinkModel();
        link.setSourcePort(model.model);

        link.getFirstPoint().updateLocation(_relative2);
        link.getLastPoint().updateLocation(_relative2);

        diagramModel.clearSelection();
        link.getLastPoint().setSelected(true);
        diagramModel.addLink(link);

        this.setState({
          action: new _actions.MoveItemsAction(event.pageX, event.pageY, diagramEngine)
        });
      } else {
        // It's some other element that needs to be moved
        if (!event.shiftKey && !model.model.isSelected()) {
          diagramModel.clearSelection();
        }
        model.model.setSelected(true);

        this.setState({
          action: new _actions.MoveItemsAction(event.pageX, event.pageY, diagramEngine)
        });
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(event) {
      var diagramEngine = this.props.diagramEngine;

      // Check if we going to connect a link to something

      if (this.state.action instanceof _actions.MoveItemsAction) {
        var element = this.getMouseElement(event);
        if (element) {
          this.state.action.selectionModels.forEach(function (model) {
            // Only care about points connecting to things
            if (!(model.model instanceof _Common.PointModel)) {
              return;
            }

            if (element.model instanceof _Common.PortModel) {
              model.model.getLink().setTargetPort(element.model);
            }
          });
        }
      }

      diagramEngine.clearRepaintEntities();
      this.setState({ action: null });
    }
  }, {
    key: 'renderLinkLayerWidget',
    value: function renderLinkLayerWidget() {
      var _this4 = this;

      var diagramEngine = this.props.diagramEngine;

      var diagramModel = diagramEngine.getDiagramModel();

      if (!this.state.renderedNodes) {
        return null;
      }

      return _react2.default.createElement(_LinkLayerWidget.LinkLayerWidget, {
        diagramEngine: diagramEngine,
        pointAdded: function pointAdded(point, event) {
          event.stopPropagation();
          diagramModel.clearSelection(point);
          _this4.setState({
            action: new _actions.MoveItemsAction(event.pageX, event.pageY, diagramEngine)
          });
        }
      });
    }
  }, {
    key: 'renderSelector',
    value: function renderSelector() {
      var action = this.state.action;


      if (!(action instanceof _actions.SelectingAction)) {
        return null;
      }

      var style = {
        width: Math.abs(action.mouseX2 - action.mouseX),
        height: Math.abs(action.mouseY2 - action.mouseY)
      };

      if (action.mouseX2 - action.mouseX < 0) {
        style.right = window.innerWidth - action.mouseX;
      } else {
        style.left = action.mouseX;
      }

      if (action.mouseY2 - action.mouseY < 0) {
        style.bottom = window.innerHeight - action.mouseY;
      } else {
        style.top = action.mouseY;
      }

      return _react2.default.createElement('div', {
        className: 'selector',
        style: style
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var diagramEngine = this.props.diagramEngine;


      return _react2.default.createElement(
        'div',
        {
          ref: 'canvas',
          className: 'react-js-diagrams-canvas',
          onWheel: this.onWheel.bind(this),
          onMouseMove: this.onMouseMove.bind(this),
          onMouseDown: this.onMouseDown.bind(this),
          onMouseUp: this.onMouseUp.bind(this)
        },
        this.renderLinkLayerWidget(),
        _react2.default.createElement(_NodeLayerWidget.NodeLayerWidget, { diagramEngine: diagramEngine }),
        this.renderSelector()
      );
    }
  }]);

  return DiagramWidget;
}(_react2.default.Component);