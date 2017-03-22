'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiagramModel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Common = require('./Common');

var _BaseEntity2 = require('./BaseEntity');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiagramModel = exports.DiagramModel = function (_BaseEntity) {
  _inherits(DiagramModel, _BaseEntity);

  function DiagramModel() {
    _classCallCheck(this, DiagramModel);

    var _this = _possibleConstructorReturn(this, (DiagramModel.__proto__ || Object.getPrototypeOf(DiagramModel)).call(this));

    _this.links = {};
    _this.nodes = {};
    _this.offsetX = 0;
    _this.offsetY = 0;
    _this.zoom = 100;
    _this.rendered = false;
    return _this;
  }

  _createClass(DiagramModel, [{
    key: 'deSerializeDiagram',
    value: function deSerializeDiagram(object, diagramEngine) {
      var _this2 = this;

      this.deSerialize(object);
      this.offsetX = object.offsetX;
      this.offsetY = object.offsetY;
      this.zoom = object.zoom;

      // Deserialize nodes
      _lodash2.default.forEach(object.nodes, function (node) {
        var nodeOb = diagramEngine.getInstanceFactory(node._class).getInstance();
        nodeOb.deSerialize(node);

        // Deserialize ports
        _lodash2.default.forEach(node.ports, function (port) {
          var portOb = diagramEngine.getInstanceFactory(port._class).getInstance();
          portOb.deSerialize(port);
          nodeOb.addPort(portOb);
        });

        _this2.addNode(nodeOb);
      });

      // Attach ports
      _lodash2.default.forEach(object.links, function (link) {
        var linkOb = diagramEngine.getInstanceFactory(link._class).getInstance();
        linkOb.deSerialize(link);

        if (link.target) {
          linkOb.setTargetPort(_this2.getNode(link.target).getPortFromID(link.targetPort));
        }

        if (link.source) {
          linkOb.setSourcePort(_this2.getNode(link.source).getPortFromID(link.sourcePort));
        }

        _this2.addLink(linkOb);
      });
    }
  }, {
    key: 'serializeDiagram',
    value: function serializeDiagram() {
      return _extends({}, this.serialize(), {
        offsetX: this.offsetX,
        offsetY: this.offsetY,
        zoom: this.zoom,
        links: _lodash2.default.map(this.links, function (link) {
          return link.serialize();
        }),
        nodes: _lodash2.default.map(this.nodes, function (link) {
          return link.serialize();
        })
      });
    }
  }, {
    key: 'clearSelection',
    value: function clearSelection(ignore) {
      _lodash2.default.forEach(this.getSelectedItems(), function (element) {
        if (ignore && ignore.getID() === element.getID()) {
          return;
        }
        element.setSelected(false); //TODO dont fire the listener
      });
    }
  }, {
    key: 'getSelectedItems',
    value: function getSelectedItems() {
      return [].concat(_toConsumableArray(_lodash2.default.filter(this.nodes, function (node) {
        return node.isSelected();
      })), _toConsumableArray(_lodash2.default.filter(_lodash2.default.flatMap(this.links, function (node) {
        return node.points;
      }), function (port) {
        return port.isSelected();
      })), _toConsumableArray(_lodash2.default.filter(this.links, function (link) {
        return link.isSelected();
      })));
    }
  }, {
    key: 'setZoomLevel',
    value: function setZoomLevel(zoom) {
      this.zoom = zoom;
      this.itterateListeners(function (listener) {
        listener.controlsUpdated();
      });
    }
  }, {
    key: 'setOffset',
    value: function setOffset(offsetX, offsetY) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.itterateListeners(function (listener) {
        listener.controlsUpdated();
      });
    }
  }, {
    key: 'setOffsetX',
    value: function setOffsetX(offsetX) {
      this.offsetX = offsetX;
      this.itterateListeners(function (listener) {
        listener.controlsUpdated();
      });
    }
  }, {
    key: 'setOffsetY',
    value: function setOffsetY(offsetY) {
      this.offsetX = offsetY;
      this.itterateListeners(function (listener) {
        listener.controlsUpdated();
      });
    }
  }, {
    key: 'getOffsetY',
    value: function getOffsetY() {
      return this.offsetY;
    }
  }, {
    key: 'getOffsetX',
    value: function getOffsetX() {
      return this.offsetX;
    }
  }, {
    key: 'getZoomLevel',
    value: function getZoomLevel() {
      return this.zoom;
    }
  }, {
    key: 'getNode',
    value: function getNode(node) {
      if (node instanceof _Common.NodeModel) {
        return node;
      }
      if (!this.nodes[node]) {
        return null;
      }
      return this.nodes[node];
    }
  }, {
    key: 'getLink',
    value: function getLink(link) {
      if (link instanceof _Common.LinkModel) {
        return link;
      }
      if (!this.links[link]) {
        return null;
      }
      return this.links[link];
    }
  }, {
    key: 'addLink',
    value: function addLink(link) {
      var _this3 = this;

      link.addListener({
        entityRemoved: function entityRemoved() {
          _this3.removeLink(link);
        }
      });
      this.links[link.getID()] = link;
      this.itterateListeners(function (listener) {
        listener.linksUpdated();
      });
      return link;
    }
  }, {
    key: 'addNode',
    value: function addNode(node) {
      var _this4 = this;

      node.addListener({
        entityRemoved: function entityRemoved() {
          _this4.removeNode(node);
        }
      });
      this.nodes[node.getID()] = node;
      this.itterateListeners(function (listener) {
        listener.nodesUpdated();
      });
      return node;
    }
  }, {
    key: 'removeLink',
    value: function removeLink(link) {
      if (link instanceof _Common.LinkModel) {
        delete this.links[link.getID()];
        this.itterateListeners(function (listener) {
          listener.linksUpdated();
        });
        return;
      }
      delete this.links['' + link];
      this.itterateListeners(function (listener) {
        listener.linksUpdated();
      });
    }
  }, {
    key: 'removeNode',
    value: function removeNode(node) {
      if (node instanceof _Common.NodeModel) {
        delete this.nodes[node.getID()];
        this.itterateListeners(function (listener) {
          listener.nodesUpdated();
        });
        return;
      }

      delete this.nodes['' + node];
      this.itterateListeners(function (listener) {
        listener.nodesUpdated();
      });
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this.links;
    }
  }, {
    key: 'getNodes',
    value: function getNodes() {
      return this.nodes;
    }
  }]);

  return DiagramModel;
}(_BaseEntity2.BaseEntity);