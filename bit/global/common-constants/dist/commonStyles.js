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
    '& .ql-snow.ql-toolbar button': {
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

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    uploadIcon: {
      fontSize: theme.spacing.unit * 8,
      color: theme.palette.text.secondary,
    },
    dropzoneButton: { marginTop: theme.spacing.unit / 2 },
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

var RENDERED_HTML = (exports.RENDERED_HTML = function RENDERED_HTML(theme) {
  return {
    renderedHtml: _extends(
      {},
      theme.typography.body1,
      {
        '& p': { margin: 0 },
        '& a': { color: theme.palette.primary.main + ' !important' },

        '& ol, & ul': { padding: 0, margin: 0 },
      },
      generateOlStyles()
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

var PAPER_VIEW = (exports.PAPER_VIEW = function PAPER_VIEW(theme) {
  return _extends(
    {
      root: {
        padding: theme.spacing.unit,
        maxWidth: 720,
        margin: '0 auto',

        '& h6': { marginBottom: theme.spacing.unit / 2 },
      },
      backButton: {
        display: 'flex',
        marginBottom: theme.spacing.unit,
      },
      paper: _extends({}, PADDING(theme)),

      title: { fontWeight: 500 },

      coverImage: {
        borderRadius: theme.shape.borderRadius / 2,
        maxWidth: '100%',
        height: '100%',
        minHeight: theme.spacing.unit * 15,

        marginBottom: theme.spacing.unit * 3,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage:
          'linear-gradient(-15deg, #fa0, ' + theme.palette.primary.main + ')',
      },

      section: {
        marginTop: theme.spacing.unit * 3,
      },
    },
    RENDERED_HTML(theme)
  );
});

//# sourceMappingURL=commonStyles.js.map
