'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeLayerWidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _NodeWidget = require('./NodeWidget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeLayerWidget = exports.NodeLayerWidget = function (_React$Component) {
  _inherits(NodeLayerWidget, _React$Component);

  function NodeLayerWidget() {
    _classCallCheck(this, NodeLayerWidget);

    return _possibleConstructorReturn(this, (NodeLayerWidget.__proto__ || Object.getPrototypeOf(NodeLayerWidget)).apply(this, arguments));
  }

  _createClass(NodeLayerWidget, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var diagramEngine = this.props.diagramEngine;

      var diagramModel = diagramEngine.getDiagramModel();
      var props = {
        className: 'node-view',
        style: {
          transform: 'scale(' + diagramModel.getZoomLevel() / 100.0 + ') translate(' + diagramModel.getOffsetX() + 'px,' + diagramModel.getOffsetY() + 'px)',
          width: '100%',
          height: '100%'
        }
      };

      // Create children
      var children = _lodash2.default.map(diagramModel.getNodes(), function (node) {
        return _react2.default.createElement(
          _NodeWidget.NodeWidget,
          { key: node.id, node: node, diagramEngine: diagramEngine },
          _this2.props.diagramEngine.generateWidgetForNode(node)
        );
      });

      return _react2.default.createElement(
        'div',
        props,
        children
      );
    }
  }]);

  return NodeLayerWidget;
}(_react2.default.Component);