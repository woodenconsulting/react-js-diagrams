'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultLinkWidget = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Common = require('../Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultLinkWidget = exports.DefaultLinkWidget = function (_React$Component) {
  _inherits(DefaultLinkWidget, _React$Component);

  function DefaultLinkWidget(props) {
    _classCallCheck(this, DefaultLinkWidget);

    var _this = _possibleConstructorReturn(this, (DefaultLinkWidget.__proto__ || Object.getPrototypeOf(DefaultLinkWidget)).call(this, props));

    _this.state = {
      selected: false
    };
    return _this;
  }

  _createClass(DefaultLinkWidget, [{
    key: 'generatePoint',
    value: function generatePoint(pointIndex) {
      var _this2 = this;

      var link = this.props.link;

      var uiCircleProps = {
        className: 'point pointui' + (link.points[pointIndex].isSelected() ? ' selected' : ''),
        cx: link.points[pointIndex].x,
        cy: link.points[pointIndex].y,
        r: 5
      };
      var circleProps = {
        className: 'point',
        'data-linkid': link.id,
        'data-id': link.points[pointIndex].id,
        cx: link.points[pointIndex].x,
        cy: link.points[pointIndex].y,
        r: 15,
        opacity: 0,
        onMouseLeave: function onMouseLeave() {
          return _this2.setState({ selected: false });
        },
        onMouseEnter: function onMouseEnter() {
          return _this2.setState({ selected: true });
        }
      };

      return _react2.default.createElement(
        'g',
        { key: 'point-' + link.points[pointIndex].id },
        _react2.default.createElement('circle', uiCircleProps),
        _react2.default.createElement('circle', circleProps)
      );
    }
  }, {
    key: 'generateLink',
    value: function generateLink(extraProps) {
      var _this3 = this;

      var _props = this.props,
          link = _props.link,
          width = _props.width,
          color = _props.color;
      var selected = this.state.selected;

      var bottom = _react2.default.createElement('path', _extends({
        className: selected || link.isSelected() ? 'selected' : '',
        strokeWidth: width,
        stroke: color
      }, extraProps));

      var top = _react2.default.createElement('path', _extends({
        strokeLinecap: 'round',
        'data-linkid': link.getID(),
        stroke: color,
        strokeOpacity: selected ? 0.1 : 0,
        strokeWidth: 20,
        onMouseLeave: function onMouseLeave() {
          return _this3.setState({ selected: false });
        },
        onMouseEnter: function onMouseEnter() {
          return _this3.setState({ selected: true });
        },
        onContextMenu: function onContextMenu(event) {
          event.preventDefault();
          _this3.props.link.remove();
        }
      }, extraProps));

      return _react2.default.createElement(
        'g',
        { key: 'link-' + extraProps.id },
        bottom,
        top
      );
    }
  }, {
    key: 'drawLine',
    value: function drawLine() {
      var _this4 = this;

      var _props2 = this.props,
          link = _props2.link,
          diagramEngine = _props2.diagramEngine,
          pointAdded = _props2.pointAdded;
      var points = link.points;

      var paths = [];

      // If the points are too close, just draw a straight line
      var margin = Math.abs(points[0].x - points[1].x) < 50 ? 5 : 50;

      var pointLeft = points[0];
      var pointRight = points[1];

      // Some defensive programming to make sure the smoothing is
      // Always in the right direction
      if (pointLeft.x > pointRight.x) {
        pointLeft = points[1];
        pointRight = points[0];
      }

      paths.push(this.generateLink({
        id: 0,
        onMouseDown: function onMouseDown(event) {
          if (!event.shiftKey) {
            var point = new _Common.PointModel(link, diagramEngine.getRelativeMousePoint(event));
            point.setSelected(true);
            _this4.forceUpdate();
            link.addPoint(point, 1);
            pointAdded(point, event);
          }
        },
        d: ' M' + pointLeft.x + ' ' + pointLeft.y + ' C' + (pointLeft.x + margin) + ' ' + pointLeft.y + ' ' + (pointRight.x - margin) + ' ' + pointRight.y + ' ' + pointRight.x + ' ' + pointRight.y
      }));

      if (link.targetPort === null) {
        paths.push(this.generatePoint(1));
      }

      return paths;
    }
  }, {
    key: 'drawAdvancedLine',
    value: function drawAdvancedLine() {
      var _this5 = this;

      var _props3 = this.props,
          link = _props3.link,
          smooth = _props3.smooth,
          diagramEngine = _props3.diagramEngine,
          pointAdded = _props3.pointAdded;
      var points = link.points;

      var ds = [];

      if (smooth) {
        ds.push(' M' + points[0].x + ' ' + points[0].y + ' C ' + (points[0].x + 50) + ' ' + points[0].y + ' ' + points[1].x + ' ' + points[1].y + ' ' + points[1].x + ' ' + points[1].y);

        var i = void 0;
        for (i = 1; i < points.length - 2; i++) {
          ds.push(' M ' + points[i].x + ' ' + points[i].y + ' L ' + points[i + 1].x + ' ' + points[i + 1].y);
        }

        ds.push(' M' + points[i].x + ' ' + points[i].y + ' C ' + points[i].x + ' ' + points[i].y + ' ' + (points[i + 1].x - 50) + ' ' + points[i + 1].y + ' ' + points[i + 1].x + ' ' + points[i + 1].y);
      } else {
        for (var _i = 0; _i < points.length - 1; _i++) {
          ds.push(' M ' + points[_i].x + ' ' + points[_i].y + ' L ' + points[_i + 1].x + ' ' + points[_i + 1].y);
        }
      }

      var paths = ds.map(function (data, index) {
        return _this5.generateLink({
          id: index,
          d: data,
          'data-linkid': link.id,
          'data-point': index,
          onMouseDown: function onMouseDown(event) {
            if (!event.shiftKey) {
              var point = new _Common.PointModel(link, diagramEngine.getRelativeMousePoint(event));
              point.setSelected(true);
              _this5.forceUpdate();
              link.addPoint(point, index + 1);
              pointAdded(point, event);
            }
          }
        });
      });

      // Render the circles
      for (var _i2 = 1; _i2 < points.length - 1; _i2++) {
        paths.push(this.generatePoint(_i2));
      }

      if (link.targetPort === null) {
        paths.push(this.generatePoint(points.length - 1));
      }

      return paths;
    }
  }, {
    key: 'render',
    value: function render() {
      var points = this.props.link.points;

      var paths = [];

      // Draw the line
      if (points.length === 2) {
        paths = this.drawLine();
      } else {
        paths = this.drawAdvancedLine();
      }

      return _react2.default.createElement(
        'g',
        null,
        paths
      );
    }
  }]);

  return DefaultLinkWidget;
}(_react2.default.Component);

DefaultLinkWidget.defaultProps = {
  color: 'black',
  width: 3,
  link: null,
  engine: null,
  smooth: false,
  diagramEngine: null
};