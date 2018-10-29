"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require("@material-ui/core/styles/withStyles");

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {}
  };
};
function EduExpCard(props) {
  var classes = props.classes,
      title = props.title,
      key = props.key,
      label = props.label,
      description = props.description,
      startDate = props.startDate,
      endDate = props.endDate;

  return _react2.default.createElement(
    "div",
    { key: key, className: classes.root },
    _react2.default.createElement(
      _Grid2.default,
      { container: true,
        direction: "column",
        alignItems: "flex-start"
      },
      _react2.default.createElement(
        _Grid2.default,
        { container: true,
          direction: "row",
          alignItems: "center",
          justify: "space-between",
          style: { minHeight: 48 } },
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 8, sm: 9 },
          _react2.default.createElement(
            _Typography2.default,
            { variant: "subheading", style: { paddingTop: 5 } },
            title
          )
        )
      ),
      _react2.default.createElement(
        _Grid2.default,
        { container: true, direction: "row", alignItems: "center", justify: "space-between" },
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 7, sm: 8 },
          _react2.default.createElement(
            _Typography2.default,
            { variant: "body1", style: { fontWeight: 700 } },
            label
          )
        ),
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 5, sm: 4 },
          _react2.default.createElement(
            _Typography2.default,
            { variant: "body1",
              style: { textAlign: 'right' } },
            startDate,
            " - ",
            endDate
          )
        )
      ),
      _react2.default.createElement(
        _Grid2.default,
        { item: true, xs: 12, style: { paddingLeft: 0, paddingRight: 0 } },
        _react2.default.createElement(
          _Typography2.default,
          { variant: "body1", style: { whiteSpace: 'pre-wrap' } },
          description
        )
      )
    )
  );
}

EduExpCard.propTypes = {
  title: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  default: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  numberOfLines: _propTypes2.default.number,
  characterLimit: _propTypes2.default.number,
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _withStyles2.default)(styles)(EduExpCard);

//# sourceMappingURL=EduExpCard.js.map