'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkLayerWidget = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _LinkWidget = require('./LinkWidget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkLayerWidget = exports.LinkLayerWidget = function (_React$Component) {
  _inherits(LinkLayerWidget, _React$Component);

  function LinkLayerWidget() {
    _classCallCheck(this, LinkLayerWidget);

    return _possibleConstructorReturn(this, (LinkLayerWidget.__proto__ || Object.getPrototypeOf(LinkLayerWidget)).apply(this, arguments));
  }

  _createClass(LinkLayerWidget, [{
    key: 'generateLinks',
    value: function generateLinks() {
      var _this2 = this;

      var diagramModel = this.props.diagramEngine.getDiagramModel();

      return _lodash2.default.map(diagramModel.getLinks(), function (link) {
        // TODO: just improve this vastly x_x
        if (link.sourcePort !== null) {
          try {
            //generate a point
            link.points[0].updateLocation(_this2.props.diagramEngine.getPortCenter(link.sourcePort));
          }
          // Remove the link because its problematic (TODO implement this rather at an engine level)
          catch (ex) {
            diagramModel.removeLink(link);
            return;
          }
        }
        if (link.targetPort !== null) {
          try {
            _lodash2.default.last(link.points).updateLocation(_this2.props.diagramEngine.getPortCenter(link.targetPort));
          }
          //remove the link because its problematic (TODO implement this rather at an engine level)
          catch (ex) {
            diagramModel.removeLink(link);
            return;
          }
        }

        // Generate the links
        var generatedLink = _this2.props.diagramEngine.generateWidgetForLink(link);
        if (!generatedLink) {
          console.log("no link generated for type: " + link.getType());
          return null;
        }

        var props = {
          key: link.getID(),
          link: link,
          diagramEngine: _this2.props.diagramEngine
        };

        return _react2.default.createElement(
          _LinkWidget.LinkWidget,
          props,
          _react2.default.cloneElement(generatedLink, { pointAdded: _this2.props.pointAdded })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var diagramModel = this.props.diagramEngine.getDiagramModel();
      var zoom = diagramModel.getZoomLevel();
      var offsetX = diagramModel.getOffsetX();
      var offsetY = diagramModel.getOffsetY();
      var svgStyle = {
        transform: 'scale(' + zoom / 100.0 + ') translate(' + offsetX + 'px, ' + offsetY + 'px)',
        width: '100%',
        height: '100%'
      };

      return _react2.default.createElement(
        'svg',
        { style: svgStyle },
        this.generateLinks()
      );
    }
  }]);

  return LinkLayerWidget;
}(_react2.default.Component);