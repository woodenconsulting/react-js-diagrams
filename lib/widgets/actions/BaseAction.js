"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseAction = exports.BaseAction = function BaseAction(mouseX, mouseY) {
  _classCallCheck(this, BaseAction);

  this.mouseX = mouseX;
  this.mouseY = mouseY;
  this.ms = new Date().getTime();
};