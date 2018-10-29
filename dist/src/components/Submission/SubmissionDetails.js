'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _reactPdf = require('react-pdf');

var _EduExpCard = require('./EduExpCard');

var _EduExpCard2 = _interopRequireDefault(_EduExpCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        subheading: {
            marginTop: 40,
            marginBottom: 10,
            fontWeight: 700
        },
        chip: {
            marginRight: 4,
            marginBottom: 4
        },
        pdfDocument: {
            width: 'calc(100vw - 800px)'
        },
        pdfPage: {
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            marginBottom: 8
        }
    };
};

var submissionDetails = function (_Component) {
    _inherits(submissionDetails, _Component);

    function submissionDetails(props) {
        _classCallCheck(this, submissionDetails);

        var _this = _possibleConstructorReturn(this, (submissionDetails.__proto__ || Object.getPrototypeOf(submissionDetails)).call(this, props));

        _this.onDocumentLoadSuccess = function (_ref) {
            var numPages = _ref.numPages;

            _this.setState({ numPages: numPages });
        };

        _this.state = { numPages: 0 };
        return _this;
    }

    _createClass(submissionDetails, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                submission = _props.submission,
                classes = _props.classes;
            var numPages = this.state.numPages;


            var pages = [];
            for (var i = 0; i < numPages; i++) {
                pages.push(_react2.default.createElement(_reactPdf.Page, { pageNumber: i + 1, key: i, width: window.innerWidth - 800 - 64,
                    className: classes.pdfPage }));
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _Typography2.default,
                    { className: classes.subheading, variant: 'subheading' },
                    'Bio:'
                ),
                _react2.default.createElement(
                    _Typography2.default,
                    { variant: 'body1' },
                    submission.submissionContent.bio
                ),
                _react2.default.createElement(
                    _Typography2.default,
                    { className: classes.subheading, variant: 'subheading' },
                    'Available Days:'
                ),
                _react2.default.createElement(
                    _Typography2.default,
                    { variant: 'body1' },
                    submission.submissionContent.availableDays
                ),
                _react2.default.createElement(
                    _Typography2.default,
                    { className: classes.subheading, variant: 'subheading' },
                    'Skills:'
                ),
                submission.submissionContent.skills.map(function (x) {
                    return _react2.default.createElement(_Chip2.default, { color: 'primary', label: x, key: x, className: classes.chip });
                }),
                _react2.default.createElement(
                    _Typography2.default,
                    { className: classes.subheading, variant: 'subheading' },
                    submission.submissionContent.process === 'upload' ? 'Resume' : 'profile',
                    ':'
                ),
                submission.submissionContent.process === 'upload' && _react2.default.createElement(
                    _reactPdf.Document,
                    {
                        onLoadSuccess: this.onDocumentLoadSuccess,
                        file: submission.submissionContent.resumeFile.downloadURL,
                        className: classes.pdfDocument
                    },
                    pages
                ),
                submission.submissionContent.process === 'build' && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _Typography2.default,
                        { className: classes.subheading, variant: 'subheading' },
                        'education'
                    ),
                    submission.submissionContent.education.map(function (x) {
                        return _react2.default.createElement(_EduExpCard2.default, { title: x.degree, label: x.major, description: x.description, startDate: x.startDate, endDate: x.endDate });
                    }),
                    _react2.default.createElement(
                        _Typography2.default,
                        { className: classes.subheading, variant: 'subheading' },
                        'experince'
                    ),
                    submission.submissionContent.experience.map(function (x) {
                        return _react2.default.createElement(_EduExpCard2.default, { title: x.title + ' - ' + x.type, label: x.organisation, description: x.description, startDate: x.startDate, endDate: x.endDate });
                    })
                )
            );
        }
    }]);

    return submissionDetails;
}(_react.Component);

exports.default = (0, _styles.withStyles)(styles)(submissionDetails);

//# sourceMappingURL=SubmissionDetails.js.map