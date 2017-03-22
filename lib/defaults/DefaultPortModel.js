'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultPortModel = exports.DefaultPortInstanceFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Common = require('../Common');

var _AbstractInstanceFactory = require('../AbstractInstanceFactory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultPortInstanceFactory = exports.DefaultPortInstanceFactory = function (_AbstractInstanceFact) {
  _inherits(DefaultPortInstanceFactory, _AbstractInstanceFact);

  function DefaultPortInstanceFactory() {
    _classCallCheck(this, DefaultPortInstanceFactory);

    return _possibleConstructorReturn(this, (DefaultPortInstanceFactory.__proto__ || Object.getPrototypeOf(DefaultPortInstanceFactory)).call(this, 'DefaultPortModel'));
  }

  _createClass(DefaultPortInstanceFactory, [{
    key: 'getInstance',
    value: function getInstance() {
      return new DefaultPortModel(true, 'unknown');
    }
  }]);

  return DefaultPortInstanceFactory;
}(_AbstractInstanceFactory.AbstractInstanceFactory);

var DefaultPortModel = exports.DefaultPortModel = function (_PortModel) {
  _inherits(DefaultPortModel, _PortModel);

  function DefaultPortModel(isInput, name) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, DefaultPortModel);

    var _this2 = _possibleConstructorReturn(this, (DefaultPortModel.__proto__ || Object.getPrototypeOf(DefaultPortModel)).call(this, name));

    _this2.in = isInput;
    _this2.label = label || name;
    return _this2;
  }

  _createClass(DefaultPortModel, [{
    key: 'deSerialize',
    value: function deSerialize(object) {
      _get(DefaultPortModel.prototype.__proto__ || Object.getPrototypeOf(DefaultPortModel.prototype), 'deSerialize', this).call(this, object);
      this.in = object.in;
      this.label = object.label;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return _extends({}, _get(DefaultPortModel.prototype.__proto__ || Object.getPrototypeOf(DefaultPortModel.prototype), 'serialize', this).call(this), {
        in: this.in,
        label: this.label
      });
    }
  }]);

  return DefaultPortModel;
}(_Common.PortModel);