'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectingAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseAction2 = require('./BaseAction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectingAction = exports.SelectingAction = function (_BaseAction) {
  _inherits(SelectingAction, _BaseAction);

  function SelectingAction(mouseX, mouseY) {
    _classCallCheck(this, SelectingAction);

    var _this = _possibleConstructorReturn(this, (SelectingAction.__proto__ || Object.getPrototypeOf(SelectingAction)).call(this, mouseX, mouseY));

    _this.mouseX2 = mouseX;
    _this.mouseY2 = mouseY;
    return _this;
  }

  _createClass(SelectingAction, [{
    key: 'containsElement',
    value: function containsElement(x, y, diagramModel) {
      var mouseX = this.mouseX,
          mouseX2 = this.mouseX2,
          mouseY = this.mouseY,
          mouseY2 = this.mouseY2;

      var z = diagramModel.getZoomLevel() / 100;
      var elX = (x + diagramModel.getOffsetX()) * z;
      var elY = (y + diagramModel.getOffsetY()) * z;

      return (mouseX2 < mouseX ? elX < mouseX : elX > mouseX) && (mouseX2 < mouseX ? elX > mouseX2 : elX < mouseX2) && (mouseY2 < mouseY ? elY < mouseY : elY > mouseY) && (mouseY2 < mouseY ? elY > mouseY2 : elY < mouseY2);
    }
  }]);

  return SelectingAction;
}(_BaseAction2.BaseAction);