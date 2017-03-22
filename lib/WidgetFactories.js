'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkWidgetFactory = exports.NodeWidgetFactory = exports.WidgetFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DefaultNodeWidget = require('./defaults/DefaultNodeWidget');

var _DefaultLinkWidget = require('./defaults/DefaultLinkWidget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WidgetFactory = exports.WidgetFactory = function () {
  function WidgetFactory(name) {
    _classCallCheck(this, WidgetFactory);

    this.type = name;
  }

  _createClass(WidgetFactory, [{
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }]);

  return WidgetFactory;
}();

var NodeWidgetFactory = exports.NodeWidgetFactory = function (_WidgetFactory) {
  _inherits(NodeWidgetFactory, _WidgetFactory);

  function NodeWidgetFactory() {
    _classCallCheck(this, NodeWidgetFactory);

    return _possibleConstructorReturn(this, (NodeWidgetFactory.__proto__ || Object.getPrototypeOf(NodeWidgetFactory)).apply(this, arguments));
  }

  _createClass(NodeWidgetFactory, [{
    key: 'generateReactWidget',
    value: function generateReactWidget(diagramEngine, node) {
      return _react2.default.createElement(_DefaultNodeWidget.DefaultNodeWidget, { node: node, diagramEngine: diagramEngine });
    }
  }]);

  return NodeWidgetFactory;
}(WidgetFactory);

var LinkWidgetFactory = exports.LinkWidgetFactory = function (_WidgetFactory2) {
  _inherits(LinkWidgetFactory, _WidgetFactory2);

  function LinkWidgetFactory() {
    _classCallCheck(this, LinkWidgetFactory);

    return _possibleConstructorReturn(this, (LinkWidgetFactory.__proto__ || Object.getPrototypeOf(LinkWidgetFactory)).apply(this, arguments));
  }

  _createClass(LinkWidgetFactory, [{
    key: 'generateReactWidget',
    value: function generateReactWidget(diagramEngine, link) {
      return _react2.default.createElement(_DefaultLinkWidget.DefaultLinkWidget, { link: link, diagramEngine: diagramEngine });
    }
  }]);

  return LinkWidgetFactory;
}(WidgetFactory);