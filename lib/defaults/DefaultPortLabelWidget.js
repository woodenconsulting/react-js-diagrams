'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultPortLabel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PortWidget = require('../widgets/PortWidget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultPortLabel = exports.DefaultPortLabel = function (_React$Component) {
  _inherits(DefaultPortLabel, _React$Component);

  function DefaultPortLabel() {
    _classCallCheck(this, DefaultPortLabel);

    return _possibleConstructorReturn(this, (DefaultPortLabel.__proto__ || Object.getPrototypeOf(DefaultPortLabel)).apply(this, arguments));
  }

  _createClass(DefaultPortLabel, [{
    key: 'render',
    value: function render() {
      var model = this.props.model;

      var port = _react2.default.createElement(_PortWidget.PortWidget, { name: model.name, node: model.getParent() });
      var label = _react2.default.createElement(
        'div',
        { className: 'name' },
        model.label
      );

      return _react2.default.createElement(
        'div',
        { className: (model.in ? 'in' : 'out') + '-port' },
        model.in ? port : label,
        model.in ? label : port
      );
    }
  }]);

  return DefaultPortLabel;
}(_react2.default.Component);

DefaultPortLabel.defaultProps = {
  in: true,
  label: 'port'
};