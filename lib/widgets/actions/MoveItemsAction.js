'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveItemsAction = undefined;

var _BaseAction2 = require('./BaseAction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveItemsAction = exports.MoveItemsAction = function (_BaseAction) {
  _inherits(MoveItemsAction, _BaseAction);

  function MoveItemsAction(mouseX, mouseY, diagramEngine) {
    _classCallCheck(this, MoveItemsAction);

    var _this = _possibleConstructorReturn(this, (MoveItemsAction.__proto__ || Object.getPrototypeOf(MoveItemsAction)).call(this, mouseX, mouseY));

    _this.moved = false;
    diagramEngine.enableRepaintEntities(diagramEngine.getDiagramModel().getSelectedItems());
    _this.selectionModels = diagramEngine.getDiagramModel().getSelectedItems().map(function (item) {
      return {
        model: item,
        initialX: item.x,
        initialY: item.y
      };
    });
    return _this;
  }

  return MoveItemsAction;
}(_BaseAction2.BaseAction);