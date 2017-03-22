'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultNodeModel = exports.DefaultNodeInstanceFactory = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Common = require('../Common');

var _AbstractInstanceFactory = require('../AbstractInstanceFactory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultNodeInstanceFactory = exports.DefaultNodeInstanceFactory = function (_AbstractInstanceFact) {
  _inherits(DefaultNodeInstanceFactory, _AbstractInstanceFact);

  function DefaultNodeInstanceFactory() {
    _classCallCheck(this, DefaultNodeInstanceFactory);

    return _possibleConstructorReturn(this, (DefaultNodeInstanceFactory.__proto__ || Object.getPrototypeOf(DefaultNodeInstanceFactory)).call(this, 'DefaultNodeModel'));
  }

  _createClass(DefaultNodeInstanceFactory, [{
    key: 'getInstance',
    value: function getInstance() {
      return new DefaultNodeModel();
    }
  }]);

  return DefaultNodeInstanceFactory;
}(_AbstractInstanceFactory.AbstractInstanceFactory);

var DefaultNodeModel = exports.DefaultNodeModel = function (_NodeModel) {
  _inherits(DefaultNodeModel, _NodeModel);

  function DefaultNodeModel() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Untitled';
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(0,192,255)';

    _classCallCheck(this, DefaultNodeModel);

    var _this2 = _possibleConstructorReturn(this, (DefaultNodeModel.__proto__ || Object.getPrototypeOf(DefaultNodeModel)).call(this, 'default'));

    _this2.name = name;
    _this2.color = color;
    return _this2;
  }

  _createClass(DefaultNodeModel, [{
    key: 'deSerialize',
    value: function deSerialize(object) {
      _get(DefaultNodeModel.prototype.__proto__ || Object.getPrototypeOf(DefaultNodeModel.prototype), 'deSerialize', this).call(this, object);
      this.name = object.name;
      this.color = object.color;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _lodash2.default.merge(_get(DefaultNodeModel.prototype.__proto__ || Object.getPrototypeOf(DefaultNodeModel.prototype), 'serialize', this).call(this), {
        name: this.name,
        color: this.color
      });
    }
  }, {
    key: 'getInPorts',
    value: function getInPorts() {
      return _lodash2.default.filter(this.ports, function (portModel) {
        return portModel.in;
      });
    }
  }, {
    key: 'getOutPorts',
    value: function getOutPorts() {
      return _lodash2.default.filter(this.ports, function (portModel) {
        return !portModel.in;
      });
    }
  }]);

  return DefaultNodeModel;
}(_Common.NodeModel);