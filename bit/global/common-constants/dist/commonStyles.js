'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var QUILL = (exports.QUILL = function QUILL(theme) {
  return {
    minHeight: 100,

    // match styling
    '& .ql-toolbar': {
      borderRadius:
        theme.shape.borderRadius + 'px ' + theme.shape.borderRadius + 'px 0 0',
      transition: theme.transitions.create('border-color', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    '& .ql-container': {
      borderRadius:
        '0 0 ' +
        theme.shape.borderRadius +
        'px ' +
        theme.shape.borderRadius +
        'px',
      transition: theme.transitions.create('border-color', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    '& .ql-editor': {
      minHeight: 100,
      fontFamily: theme.typography.fontFamily,
      fontSize: '.875rem',
      color: theme.palette.text.primary,
      '&.ql-blank::before': {
        fontStyle: 'normal',
        color: theme.palette.text.disabled,
      },
    },

    // highlight border on focus
    '&:focus-within .ql-toolbar.ql-snow, &:focus-within .ql-container.ql-snow': {
      borderColor: theme.palette.primary.main,
    },

    // buttons stroke/fill colour matching
    '& .ql-snow.ql-toolbar button, & .ql-snow .ql-picker-label': {
      borderRadius: theme.shape.borderRadius / 2,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    '& .ql-snow .ql-stroke': {
      stroke: theme.palette.text.primary,
      transition: theme.transitions.create('stroke', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    '& .ql-snow .ql-fill': {
      fill: theme.palette.text.primary,
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.shortest,
      }),
    },

    // colour buttons on hover
    '& button:hover .ql-stroke': {
      stroke: theme.palette.primary.main + ' !important',
    },
    '& button:hover .ql-fill': {
      fill: theme.palette.primary.main + ' !important',
    },

    // highlight buttons when selected/active
    '& .ql-snow.ql-toolbar .ql-active': {
      backgroundColor: theme.palette.primary.light,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main + ' !important',
      },
      '& .ql-fill': {
        fill: theme.palette.primary.main + ' !important',
      },
    },

    // dropdown styling
    '& .ql-snow.ql-toolbar button:hover, & .ql-snow .ql-toolbar button:hover, & .ql-snow.ql-toolbar button:focus, & .ql-snow .ql-toolbar button:focus, & .ql-snow.ql-toolbar button.ql-active, & .ql-snow .ql-toolbar button.ql-active, & .ql-snow.ql-toolbar .ql-picker-label:hover, & .ql-snow .ql-toolbar .ql-picker-label:hover, & .ql-snow.ql-toolbar .ql-picker-label.ql-active, & .ql-snow .ql-toolbar .ql-picker-label.ql-active, & .ql-snow.ql-toolbar .ql-picker-item:hover, & .ql-snow .ql-toolbar .ql-picker-item:hover, & .ql-snow.ql-toolbar .ql-picker-item.ql-selected, & .ql-snow .ql-toolbar .ql-picker-item.ql-selected': {
      color: theme.palette.primary.main,

      '& polygon': { stroke: theme.palette.primary.main + ' !important' },
    },
  };
});

var DROPZONE = (exports.DROPZONE = function DROPZONE(theme) {
  return {
    dropzone: {
      borderRadius: theme.shape.borderRadius,
      borderColor: theme.palette.divider,
      borderStyle: 'dashed',
      borderWidth: theme.spacing.unit / 2,
      padding: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 3,
      textAlign: 'center',
      minHeight: theme.spacing.unit * 12,
      cursor: 'pointer',
      userSelect: 'none',
      outline: 'none',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

      '&:not($dropzoneDisabled):focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,

        '& *': { color: theme.palette.primary.main },
      },
    },
    dropzoneDragActive: {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,

      '& *': { color: theme.palette.primary.main },
    },
    dropzoneDisabled: { cursor: 'default' },
    uploadIcon: {
      fontSize: theme.spacing.unit * 8,
      color: theme.palette.text.secondary,
    },
    dropzoneButton: { marginTop: theme.spacing.unit / 2 },
    fileChipWrapper: { textAlign: 'center' },
    fileChip: {
      cursor: 'pointer',
      marginTop: theme.spacing.unit,
    },
    fileIcon: { transform: 'rotate(-45deg)' },
  };
});

var generateOlStyles = function generateOlStyles() {
  var output = {};

  for (var i = 0; i < 10; i++) {
    var counterReset = '';
    for (var j = i + 1; j < 10; j++) {
      counterReset += 'list-' + j + ' ';
    }

    var listStyleType = 'decimal';
    if ((i + 1) % 2 === 0) listStyleType = 'lower-alpha';
    if ((i + 1) % 3 === 0) listStyleType = 'lower-roman';

    var marginTop = 0;
    if (i === 0) marginTop = 12;
    if (i === 1) marginTop = 4;

    output[i === 0 ? '& ol li' : '& ol li.ql-indent-' + i] = {
      counterIncrement: 'list-' + i,
      counterReset: counterReset,

      listStyleType: 'none',
      paddingLeft: 1.5 + 2 * i + 'em',

      '&::before': {
        content: 'counter(list-' + i + ', ' + listStyleType + ") '. '",
        marginLeft: '-1.5em',
        marginRight: '0.4em',

        fontWeight: 500,
        textAlign: 'right',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: '1.1em',
      },

      marginTop: marginTop,
    };
  }

  return output;
};
var generateUlStyles = function generateUlStyles() {
  var output = {};

  for (var i = 0; i < 10; i++) {
    var marginTop = 0;
    if (i === 0) marginTop = 8;
    if (i === 1) marginTop = 4;

    output[i === 0 ? '& ul li' : '& ul li.ql-indent-' + i] = {
      listStyleType: 'none',
      paddingLeft: 1.5 + 2 * i + 'em',

      '&::before': {
        content: '"\u2022"',
        marginLeft: '-1.5em',
        marginRight: '0.75em',

        textAlign: 'right',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: '0.5em',
      },

      marginTop: marginTop,
    };
  }

  return output;
};
var generatePreStyles = function generatePreStyles(theme) {
  return {
    '& pre': {
      backgroundColor: '#222',
      color: '#fff',

      fontFamily:
        'SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace',
      fontSize: '.875rem',

      overflow: 'visible',
      whiteSpace: 'pre-wrap',

      margin: theme.spacing.unit / 2 + 'px 0',
      padding: theme.spacing.unit * 1.5 + 'px ' + theme.spacing.unit * 2 + 'px',
      borderRadius: theme.shape.borderRadius / 2,
    },
  };
};

var RENDERED_HTML = (exports.RENDERED_HTML = function RENDERED_HTML(theme) {
  return {
    renderedHtml: _extends(
      {},
      theme.typography.body1,
      {
        '& p, & h1, & h2, & h3, & h4, & h5, & h6, & blockquote': {
          margin: 0,
          padding: 0,
        },
        '& a': { color: theme.palette.primary.main + ' !important' },

        '& ol, & ul': { padding: 0, margin: 0 },

        '& img': { maxWidth: '100%' },
        '& iframe': { width: 480, height: 270 },
      },
      generateOlStyles(),
      generateUlStyles(),
      generatePreStyles(theme)
    ),
    renderedHtmlOriginal: _extends({}, theme.typography.body2, {
      '& p': { margin: 0 },
    }),
  };
});

var PADDING = (exports.PADDING = function PADDING(theme, topMargin) {
  var _ref;

  return (
    (_ref = {
      padding: theme.spacing.unit * 3,
    }),
    _defineProperty(_ref, theme.breakpoints.down('sm'), {
      padding: theme.spacing.unit * 2,
    }),
    _defineProperty(_ref, 'marginTop', topMargin ? theme.spacing.unit * 2 : 0),
    _ref
  );
});

var DETAIL_VIEW = (exports.DETAIL_VIEW = function DETAIL_VIEW(theme) {
  return _extends(
    {
      root: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 2,
      },
      backButton: {
        display: 'flex',
        marginBottom: theme.spacing.unit,
      },
      content: {
        maxWidth: 640,
        margin: '0 auto',
      },

      title: {
        fontWeight: 400,
        textAlign: 'center',
      },

      coverImage: {
        borderRadius: theme.shape.borderRadius * 0.75,
        width: '100%',
        height: '100%',

        maxWidth: 480,
        minHeight: 160,

        margin: '0 auto',
        marginBottom: theme.spacing.unit * 3,

        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage:
          'linear-gradient(-15deg, #fa0, ' + theme.palette.primary.main + ')',
      },

      section: { marginTop: theme.spacing.unit * 3 },

      subtitle: { fontWeight: 700 },

      description: { whiteSpace: 'pre-line' },
    },
    RENDERED_HTML(theme)
  );
});

var NAKED_EXPANSION_PANEL = (exports.NAKED_EXPANSION_PANEL = function NAKED_EXPANSION_PANEL(
  theme
) {
  return {
    expansionPanel: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      '&::before': { display: 'none' },
    },
    expansionPanelExpanded: { margin: 0 },

    expansionPanelSummary: {
      padding: 0,
      '&$expansionPanelSummaryExpanded': { minHeight: 48 },
    },
    expansionPanelSummaryExpanded: {},
    expansionPanelSummaryExpandIcon: { right: -theme.spacing.unit * 1.5 },
    expansionPanelSummaryContent: {
      '&$expansionPanelSummaryExpanded': {
        margin: '12px 0',
      },
    },
    expansionPanelDetails: {
      flexDirection: 'column',
      padding: 0,
      paddingBottom: theme.spacing.unit * 2,
    },

    /* CLASSES PROPS
      ExpansionPanel:
      {
        root: classes.expansionPanel,
        expanded: classes.expansionPanelExpanded,
      }
       ExpansionPanelSummary:
      {
        root: classes.expansionPanelSummary,
        content: classes.expansionPanelSummaryContent,
        expanded: classes.expansionPanelSummaryExpanded,
        expandIcon: classes.expansionPanelSummaryExpandIcon,
      }
       ExpansionPanelDetails:
      { root: classes.expansionPanelDetails }
    */
  };
});

//# sourceMappingURL=commonStyles.js.map
