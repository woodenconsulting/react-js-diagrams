'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseEntity = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Toolkit = require('./Toolkit');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseEntity = exports.BaseEntity = function () {
  function BaseEntity() {
    _classCallCheck(this, BaseEntity);

    this.listeners = {};
    this.id = _Toolkit.Toolkit.UID();
  }

  _createClass(BaseEntity, [{
    key: 'getID',
    value: function getID() {
      return this.id;
    }
  }, {
    key: 'clearListeners',
    value: function clearListeners() {
      this.listeners = {};
    }
  }, {
    key: 'deSerialize',
    value: function deSerialize(data) {
      this.id = data.id;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return {
        id: this.id
      };
    }
  }, {
    key: 'itterateListeners',
    value: function itterateListeners(cb) {
      for (var key in this.listeners) {
        cb(this.listeners[key]);
      }
    }
  }, {
    key: 'removeListener',
    value: function removeListener(listener) {
      if (this.listeners[listener]) {
        delete this.listeners[listener];
        return true;
      }
      return false;
    }
  }, {
    key: 'addListener',
    value: function addListener(listener) {
      var uid = _Toolkit.Toolkit.UID();
      this.listeners[uid] = listener;
      return uid;
    }
  }]);

  return BaseEntity;
}();