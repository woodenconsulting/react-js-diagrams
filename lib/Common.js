'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeModel = exports.PortModel = exports.LinkModel = exports.PointModel = exports.BaseModel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BaseEntity2 = require('./BaseEntity');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseModel = exports.BaseModel = function (_BaseEntity) {
  _inherits(BaseModel, _BaseEntity);

  function BaseModel() {
    _classCallCheck(this, BaseModel);

    var _this = _possibleConstructorReturn(this, (BaseModel.__proto__ || Object.getPrototypeOf(BaseModel)).call(this));

    _this.selected = false;
    return _this;
  }

  _createClass(BaseModel, [{
    key: 'deSerialize',
    value: function deSerialize(ob) {
      _get(BaseModel.prototype.__proto__ || Object.getPrototypeOf(BaseModel.prototype), 'deSerialize', this).call(this, ob);
      this.selected = ob.selected;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _extends({}, _get(BaseModel.prototype.__proto__ || Object.getPrototypeOf(BaseModel.prototype), 'serialize', this).call(this), {
        _class: this.constructor.name,
        selected: this.selected
      });
    }
  }, {
    key: 'getID',
    value: function getID() {
      return this.id;
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this.selected;
    }
  }, {
    key: 'setSelected',
    value: function setSelected(selected) {
      this.selected = selected;

      this.itterateListeners(function (listener) {
        if (listener.selectionChanged) {
          listener.selectionChanged();
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.itterateListeners(function (listener) {
        if (listener.entityRemoved) {
          listener.entityRemoved();
        }
      });
    }
  }]);

  return BaseModel;
}(_BaseEntity2.BaseEntity);

var PointModel = exports.PointModel = function (_BaseModel) {
  _inherits(PointModel, _BaseModel);

  function PointModel(link, points) {
    _classCallCheck(this, PointModel);

    var _this2 = _possibleConstructorReturn(this, (PointModel.__proto__ || Object.getPrototypeOf(PointModel)).call(this));

    _this2.x = points.x;
    _this2.y = points.y;
    _this2.link = link;
    return _this2;
  }

  _createClass(PointModel, [{
    key: 'deSerialize',
    value: function deSerialize(ob) {
      _get(PointModel.prototype.__proto__ || Object.getPrototypeOf(PointModel.prototype), 'deSerialize', this).call(this, ob);
      this.x = ob.x;
      this.y = ob.y;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _extends({}, _get(PointModel.prototype.__proto__ || Object.getPrototypeOf(PointModel.prototype), 'serialize', this).call(this), {
        x: this.x,
        y: this.y
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      _get(PointModel.prototype.__proto__ || Object.getPrototypeOf(PointModel.prototype), 'remove', this).call(this);

      // Clear references
      if (this.link) {
        this.link.removePoint(this);
      }
    }
  }, {
    key: 'updateLocation',
    value: function updateLocation(points) {
      this.x = points.x;
      this.y = points.y;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'getLink',
    value: function getLink() {
      return this.link;
    }
  }]);

  return PointModel;
}(BaseModel);

var LinkModel = exports.LinkModel = function (_BaseModel2) {
  _inherits(LinkModel, _BaseModel2);

  function LinkModel() {
    _classCallCheck(this, LinkModel);

    var _this3 = _possibleConstructorReturn(this, (LinkModel.__proto__ || Object.getPrototypeOf(LinkModel)).call(this));

    _this3.linkType = 'default';
    _this3.points = [new PointModel(_this3, { x: 0, y: 0 }), new PointModel(_this3, { x: 0, y: 0 })];
    _this3.extras = {};
    _this3.sourcePort = null;
    _this3.targetPort = null;
    return _this3;
  }

  _createClass(LinkModel, [{
    key: 'deSerialize',
    value: function deSerialize(ob) {
      var _this4 = this;

      _get(LinkModel.prototype.__proto__ || Object.getPrototypeOf(LinkModel.prototype), 'deSerialize', this).call(this, ob);
      this.linkType = ob.type;
      this.points = ob.points.map(function (point) {
        var p = new PointModel(_this4, { x: point.x, y: point.y });
        p.deSerialize(point);
        return p;
      });
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _extends({}, _get(LinkModel.prototype.__proto__ || Object.getPrototypeOf(LinkModel.prototype), 'serialize', this).call(this), {
        type: this.linkType,
        source: this.sourcePort ? this.sourcePort.getParent().id : null,
        sourcePort: this.sourcePort ? this.sourcePort.id : null,
        target: this.targetPort ? this.targetPort.getParent().id : null,
        targetPort: this.targetPort ? this.targetPort.id : null,
        points: this.points.map(function (point) {
          return point.serialize();
        }),
        extras: this.extras
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      _get(LinkModel.prototype.__proto__ || Object.getPrototypeOf(LinkModel.prototype), 'remove', this).call(this);
      if (this.sourcePort) {
        this.sourcePort.removeLink(this);
      }
      if (this.targetPort) {
        this.targetPort.removeLink(this);
      }
    }
  }, {
    key: 'isLastPoint',
    value: function isLastPoint(point) {
      return this.getPointIndex(point) === this.points.length - 1;
    }
  }, {
    key: 'getPointIndex',
    value: function getPointIndex(point) {
      return this.points.indexOf(point);
    }
  }, {
    key: 'getPointModel',
    value: function getPointModel(id) {
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].id === id) {
          return this.points[i];
        }
      }
      return null;
    }
  }, {
    key: 'getFirstPoint',
    value: function getFirstPoint() {
      return this.points[0];
    }
  }, {
    key: 'getLastPoint',
    value: function getLastPoint() {
      return this.points[this.points.length - 1];
    }
  }, {
    key: 'setSourcePort',
    value: function setSourcePort(port) {
      port.addLink(this);
      this.sourcePort = port;
    }
  }, {
    key: 'getSourcePort',
    value: function getSourcePort() {
      return this.sourcePort;
    }
  }, {
    key: 'getTargetPort',
    value: function getTargetPort() {
      return this.targetPort;
    }
  }, {
    key: 'setTargetPort',
    value: function setTargetPort(port) {
      port.addLink(this);
      this.targetPort = port;
    }
  }, {
    key: 'getPoints',
    value: function getPoints() {
      return this.points;
    }
  }, {
    key: 'setPoints',
    value: function setPoints(points) {
      this.points = points;
    }
  }, {
    key: 'removePoint',
    value: function removePoint(pointModel) {
      this.points.splice(this.getPointIndex(pointModel), 1);
    }
  }, {
    key: 'addPoint',
    value: function addPoint(pointModel) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      this.points.splice(index, 0, pointModel);
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.linkType;
    }
  }]);

  return LinkModel;
}(BaseModel);

var PortModel = exports.PortModel = function (_BaseModel3) {
  _inherits(PortModel, _BaseModel3);

  function PortModel(name) {
    _classCallCheck(this, PortModel);

    var _this5 = _possibleConstructorReturn(this, (PortModel.__proto__ || Object.getPrototypeOf(PortModel)).call(this));

    _this5.name = name;
    _this5.links = {};
    _this5.parentNode = null;
    return _this5;
  }

  _createClass(PortModel, [{
    key: 'deSerialize',
    value: function deSerialize(ob) {
      _get(PortModel.prototype.__proto__ || Object.getPrototypeOf(PortModel.prototype), 'deSerialize', this).call(this, ob);
      this.name = ob.name;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _extends({}, _get(PortModel.prototype.__proto__ || Object.getPrototypeOf(PortModel.prototype), 'serialize', this).call(this), {
        name: this.name,
        parentNode: this.parentNode.id,
        links: _lodash2.default.map(this.links, function (link) {
          return link.id;
        })
      });
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'getParent',
    value: function getParent() {
      return this.parentNode;
    }
  }, {
    key: 'setParentNode',
    value: function setParentNode(node) {
      this.parentNode = node;
    }
  }, {
    key: 'removeLink',
    value: function removeLink(link) {
      delete this.links[link.getID()];
    }
  }, {
    key: 'addLink',
    value: function addLink(link) {
      this.links[link.getID()] = link;
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this.links;
    }
  }]);

  return PortModel;
}(BaseModel);

var NodeModel = exports.NodeModel = function (_BaseModel4) {
  _inherits(NodeModel, _BaseModel4);

  function NodeModel() {
    var nodeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

    _classCallCheck(this, NodeModel);

    var _this6 = _possibleConstructorReturn(this, (NodeModel.__proto__ || Object.getPrototypeOf(NodeModel)).call(this));

    _this6.nodeType = nodeType;
    _this6.x = 0;
    _this6.y = 0;
    _this6.extras = {};
    _this6.ports = {};
    return _this6;
  }

  _createClass(NodeModel, [{
    key: 'deSerialize',
    value: function deSerialize(ob) {
      _get(NodeModel.prototype.__proto__ || Object.getPrototypeOf(NodeModel.prototype), 'deSerialize', this).call(this, ob);
      this.nodeType = ob.type;
      this.x = ob.x;
      this.y = ob.y;
      this.extras = ob.extras;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _extends({}, _get(NodeModel.prototype.__proto__ || Object.getPrototypeOf(NodeModel.prototype), 'serialize', this).call(this), {
        type: this.nodeType,
        x: this.x,
        y: this.y,
        extras: this.extras,
        ports: _lodash2.default.map(this.ports, function (port) {
          return port.serialize();
        })
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      _get(NodeModel.prototype.__proto__ || Object.getPrototypeOf(NodeModel.prototype), 'remove', this).call(this);
      for (var key in this.ports) {
        this.ports[key].getLinks().forEach(function (link) {
          return link.remove();
        });
      }
    }
  }, {
    key: 'getPortFromID',
    value: function getPortFromID(id) {
      for (var key in this.ports) {
        if (this.ports[key].id === id) {
          return this.ports[key];
        }
      }
      return null;
    }
  }, {
    key: 'getPort',
    value: function getPort(name) {
      return this.ports[name];
    }
  }, {
    key: 'getPorts',
    value: function getPorts() {
      return this.ports;
    }
  }, {
    key: 'removePort',
    value: function removePort(port) {
      // Clear the parent node reference
      if (this.ports[port.name]) {
        this.ports[port.name].setParentNode(null);
        delete this.ports[port.name];
      }
    }
  }, {
    key: 'addPort',
    value: function addPort(port) {
      port.setParentNode(this);
      this.ports[port.name] = port;
      return port;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.nodeType;
    }
  }]);

  return NodeModel;
}(BaseModel);