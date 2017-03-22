'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkInstanceFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Common = require('./Common');

var _AbstractInstanceFactory = require('./AbstractInstanceFactory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkInstanceFactory = exports.LinkInstanceFactory = function (_AbstractInstanceFact) {
  _inherits(LinkInstanceFactory, _AbstractInstanceFact);

  function LinkInstanceFactory() {
    _classCallCheck(this, LinkInstanceFactory);

    return _possibleConstructorReturn(this, (LinkInstanceFactory.__proto__ || Object.getPrototypeOf(LinkInstanceFactory)).call(this, 'LinkModel'));
  }

  _createClass(LinkInstanceFactory, [{
    key: 'getInstance',
    value: function getInstance() {
      return new _Common.LinkModel();
    }
  }]);

  return LinkInstanceFactory;
}(_AbstractInstanceFactory.AbstractInstanceFactory);