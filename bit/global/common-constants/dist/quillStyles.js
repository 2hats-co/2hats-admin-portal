'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var QUILL_STYLES = (exports.QUILL_STYLES = function QUILL_STYLES(theme) {
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

//# sourceMappingURL=quillStyles.js.map
