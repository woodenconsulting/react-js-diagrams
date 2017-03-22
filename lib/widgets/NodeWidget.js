'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeWidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeWidget = exports.NodeWidget = function (_React$Component) {
  _inherits(NodeWidget, _React$Component);

  function NodeWidget() {
    _classCallCheck(this, NodeWidget);

    return _possibleConstructorReturn(this, (NodeWidget.__proto__ || Object.getPrototypeOf(NodeWidget)).apply(this, arguments));
  }

  _createClass(NodeWidget, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return this.props.diagramEngine.canEntityRepaint(this.props.node);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          node = _props.node,
          children = _props.children;

      var props = {
        'data-nodeid': node.id,
        className: 'node' + (this.props.node.isSelected() ? ' selected' : ''),
        style: {
          top: this.props.node.y,
          left: this.props.node.x
        }
      };

      return _react2.default.createElement(
        'div',
        props,
        children
      );
    }
  }]);

  return NodeWidget;
}(_react2.default.Component);