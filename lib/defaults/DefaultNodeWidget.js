'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultNodeWidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DefaultPortLabelWidget = require('./DefaultPortLabelWidget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultNodeWidget = exports.DefaultNodeWidget = function (_React$Component) {
  _inherits(DefaultNodeWidget, _React$Component);

  function DefaultNodeWidget() {
    _classCallCheck(this, DefaultNodeWidget);

    return _possibleConstructorReturn(this, (DefaultNodeWidget.__proto__ || Object.getPrototypeOf(DefaultNodeWidget)).apply(this, arguments));
  }

  _createClass(DefaultNodeWidget, [{
    key: 'onRemove',
    value: function onRemove() {
      var _props = this.props,
          node = _props.node,
          diagramEngine = _props.diagramEngine;

      node.remove();
      diagramEngine.forceUpdate();
    }
  }, {
    key: 'getInPorts',
    value: function getInPorts() {
      var node = this.props.node;

      return node.getInPorts().map(function (port, i) {
        return _react2.default.createElement(_DefaultPortLabelWidget.DefaultPortLabel, { model: port, key: 'in-port-' + i });
      });
    }
  }, {
    key: 'getOutPorts',
    value: function getOutPorts() {
      var node = this.props.node;

      return node.getOutPorts().map(function (port, i) {
        return _react2.default.createElement(_DefaultPortLabelWidget.DefaultPortLabel, { model: port, key: 'out-port-' + i });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var node = this.props.node;

      return _react2.default.createElement(
        'div',
        { className: 'basic-node', style: { background: node.color } },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          _react2.default.createElement(
            'div',
            { className: 'name' },
            node.name
          ),
          _react2.default.createElement('div', { className: 'fa fa-close', onClick: this.onRemove.bind(this) })
        ),
        _react2.default.createElement(
          'div',
          { className: 'ports' },
          _react2.default.createElement(
            'div',
            { className: 'in' },
            this.getInPorts()
          ),
          _react2.default.createElement(
            'div',
            { className: 'out' },
            this.getOutPorts()
          )
        )
      );
    }
  }]);

  return DefaultNodeWidget;
}(_react2.default.Component);

DefaultNodeWidget.defaultProps = {
  node: null
};