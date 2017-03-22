'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiagramEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Common = require('./Common');

var _BaseEntity2 = require('./BaseEntity');

var _DiagramModel = require('./DiagramModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Passed as a parameter to the DiagramWidget
 */
var DiagramEngine = exports.DiagramEngine = function (_BaseEntity) {
  _inherits(DiagramEngine, _BaseEntity);

  function DiagramEngine() {
    _classCallCheck(this, DiagramEngine);

    var _this = _possibleConstructorReturn(this, (DiagramEngine.__proto__ || Object.getPrototypeOf(DiagramEngine)).call(this));

    _this.diagramModel = new _DiagramModel.DiagramModel();
    _this.nodeFactories = {};
    _this.linkFactories = {};
    _this.instanceFactories = {};
    _this.canvas = null;
    _this.paintableWidgets = null;
    _this.forceUpdate = function () {};
    return _this;
  }

  _createClass(DiagramEngine, [{
    key: 'clearRepaintEntities',
    value: function clearRepaintEntities() {
      this.paintableWidgets = null;
    }
  }, {
    key: 'enableRepaintEntities',
    value: function enableRepaintEntities(entities) {
      var _this2 = this;

      this.paintableWidgets = {};
      entities.forEach(function (entity) {

        // If a node is requested to repaint, add all of its links
        if (entity instanceof _Common.NodeModel) {
          _lodash2.default.forEach(entity.getPorts(), function (port) {
            _lodash2.default.forEach(port.getLinks(), function (link) {
              _this2.paintableWidgets[link.getID()] = true;
            });
          });
        }

        if (entity instanceof _Common.PointModel) {
          _this2.paintableWidgets[entity.getLink().getID()] = true;
        }

        _this2.paintableWidgets[entity.getID()] = true;
      });
    }
  }, {
    key: 'canEntityRepaint',
    value: function canEntityRepaint(baseModel) {
      // No rules applied, allow repaint
      if (this.paintableWidgets === null) {
        return true;
      }

      return this.paintableWidgets[baseModel.getID()] !== undefined;
    }
  }, {
    key: 'setCanvas',
    value: function setCanvas(canvas) {
      this.canvas = canvas;
    }
  }, {
    key: 'setDiagramModel',
    value: function setDiagramModel(model) {
      this.diagramModel = model;
    }
  }, {
    key: 'setForceUpdate',
    value: function setForceUpdate(forceUpdate) {
      this.forceUpdate = forceUpdate;
    }
  }, {
    key: 'getDiagramModel',
    value: function getDiagramModel() {
      return this.diagramModel;
    }
  }, {
    key: 'getNodeFactories',
    value: function getNodeFactories() {
      return this.nodeFactories;
    }
  }, {
    key: 'getLinkFactories',
    value: function getLinkFactories() {
      return this.linkFactories;
    }
  }, {
    key: 'getInstanceFactory',
    value: function getInstanceFactory(className) {
      return this.instanceFactories[className];
    }
  }, {
    key: 'registerInstanceFactory',
    value: function registerInstanceFactory(factory) {
      this.instanceFactories[factory.getName()] = factory;
    }
  }, {
    key: 'registerNodeFactory',
    value: function registerNodeFactory(factory) {
      this.nodeFactories[factory.getType()] = factory;
      this.itterateListeners(function (listener) {
        listener.nodeFactoriesUpdated();
      });
    }
  }, {
    key: 'registerLinkFactory',
    value: function registerLinkFactory(factory) {
      this.linkFactories[factory.getType()] = factory;
      this.itterateListeners(function (listener) {
        listener.linkFactoriesUpdated();
      });
    }
  }, {
    key: 'getFactoryForNode',
    value: function getFactoryForNode(node) {
      if (this.nodeFactories[node.getType()]) {
        return this.nodeFactories[node.getType()];
      }
      console.log('Cannot find widget factory for node of type: [' + node.getType() + ']');
      return null;
    }
  }, {
    key: 'getFactoryForLink',
    value: function getFactoryForLink(link) {
      if (this.linkFactories[link.getType()]) {
        return this.linkFactories[link.getType()];
      }
      console.log('Cannot find widget factory for link of type: [' + link.getType() + ']');
      return null;
    }
  }, {
    key: 'generateWidgetForLink',
    value: function generateWidgetForLink(link) {
      var linkFactory = this.getFactoryForLink(link);
      if (!linkFactory) {
        throw 'Cannot find link factory for link: ' + link.getType();
      }
      return linkFactory.generateReactWidget(this, link);
    }
  }, {
    key: 'generateWidgetForNode',
    value: function generateWidgetForNode(node) {
      var nodeFactory = this.getFactoryForNode(node);
      if (!nodeFactory) {
        throw 'Cannot find widget factory for node: ' + node.getType();
      }
      return nodeFactory.generateReactWidget(this, node);
    }
  }, {
    key: 'getRelativeMousePoint',
    value: function getRelativeMousePoint(event) {
      var point = this.getRelativePoint(event.pageX, event.pageY);
      return {
        x: point.x / (this.diagramModel.getZoomLevel() / 100.0) - this.diagramModel.getOffsetX(),
        y: point.y / (this.diagramModel.getZoomLevel() / 100.0) - this.diagramModel.getOffsetY()
      };
    }
  }, {
    key: 'getRelativePoint',
    value: function getRelativePoint(x, y) {
      var canvasRect = this.canvas.getBoundingClientRect();
      return { x: x - canvasRect.left, y: y - canvasRect.top };
    }
  }, {
    key: 'getNodePortElement',
    value: function getNodePortElement(port) {
      var selector = this.canvas.querySelector('.port[data-name="' + port.getName() + '"][data-nodeid="' + port.getParent().getID() + '"]');
      if (selector === null) {
        throw 'Cannot find Node Port element with nodeID: [' + port.getParent().getID() + '] and name: [' + port.getName() + ']';
      }
      return selector;
    }
  }, {
    key: 'getPortCenter',
    value: function getPortCenter(port) {
      var sourceElement = this.getNodePortElement(port);
      var sourceRect = sourceElement.getBoundingClientRect();
      var rel = this.getRelativePoint(sourceRect.left, sourceRect.top);
      var x = sourceElement.offsetWidth / 2 + rel.x / (this.diagramModel.getZoomLevel() / 100.0) - this.diagramModel.getOffsetX();
      var y = sourceElement.offsetHeight / 2 + rel.y / (this.diagramModel.getZoomLevel() / 100.0) - this.diagramModel.getOffsetY();

      return {
        x: x,
        y: y
      };
    }
  }]);

  return DiagramEngine;
}(_BaseEntity2.BaseEntity);