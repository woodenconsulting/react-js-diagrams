'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveCanvasAction = undefined;

var _BaseAction2 = require('./BaseAction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveCanvasAction = exports.MoveCanvasAction = function (_BaseAction) {
  _inherits(MoveCanvasAction, _BaseAction);

  function MoveCanvasAction(mouseX, mouseY, diagramModel) {
    _classCallCheck(this, MoveCanvasAction);

    var _this = _possibleConstructorReturn(this, (MoveCanvasAction.__proto__ || Object.getPrototypeOf(MoveCanvasAction)).call(this, mouseX, mouseY));

    _this.initialOffsetX = diagramModel.getOffsetX();
    _this.initialOffsetY = diagramModel.getOffsetY();
    return _this;
  }

  return MoveCanvasAction;
}(_BaseAction2.BaseAction);