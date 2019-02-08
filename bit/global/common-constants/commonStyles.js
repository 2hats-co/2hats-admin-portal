export const QUILL = theme => ({
  minHeight: 100,

  // match styling
  '& .ql-toolbar': {
    borderRadius: `${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px 0 0`,
    transition: theme.transitions.create('border-color', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  '& .ql-container': {
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${
      theme.shape.borderRadius
    }px`,
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
    stroke: `${theme.palette.primary.main} !important`,
  },
  '& button:hover .ql-fill': {
    fill: `${theme.palette.primary.main} !important`,
  },

  // highlight buttons when selected/active
  '& .ql-snow.ql-toolbar .ql-active': {
    backgroundColor: theme.palette.primary.light,
    '& .ql-stroke': {
      stroke: `${theme.palette.primary.main} !important`,
    },
    '& .ql-fill': {
      fill: `${theme.palette.primary.main} !important`,
    },
  },
});

export const DROPZONE = theme => ({
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
});

const generateOlStyles = () => {
  const output = {};

  for (let i = 0; i < 10; i++) {
    let counterReset = '';
    for (let j = i + 1; j < 10; j++) {
      counterReset += `list-${j} `;
    }

    let listStyleType = 'decimal';
    if ((i + 1) % 2 === 0) listStyleType = 'lower-alpha';
    if ((i + 1) % 3 === 0) listStyleType = 'lower-roman';

    let marginTop = 0;
    if (i === 0) marginTop = 12;
    if (i === 1) marginTop = 4;

    output[i === 0 ? '& ol li' : `& ol li.ql-indent-${i}`] = {
      counterIncrement: `list-${i}`,
      counterReset,

      listStyleType: 'none',
      paddingLeft: `${1.5 + 2 * i}em`,

      '&::before': {
        content: `counter(list-${i}, ${listStyleType}) '. '`,
        marginLeft: '-1.5em',
        marginRight: '0.4em',

        fontWeight: 500,
        textAlign: 'right',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: '1.1em',
      },

      marginTop,
    };
  }

  return output;
};

export const RENDERED_HTML = theme => ({
  renderedHtml: {
    ...theme.typography.body1,

    '& p': { margin: 0 },
    '& a': { color: `${theme.palette.primary.main} !important` },

    '& ol, & ul': { padding: 0, margin: 0 },

    ...generateOlStyles(),
  },
  renderedHtmlOriginal: {
    ...theme.typography.body2,
    '& p': { margin: 0 },
  },
});

export const PADDING = (theme, topMargin) => ({
  padding: theme.spacing.unit * 3,
  [theme.breakpoints.down('sm')]: { padding: theme.spacing.unit * 2 },

  marginTop: topMargin ? theme.spacing.unit * 2 : 0,
});

export const DETAIL_VIEW = theme => ({
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
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  section: { marginTop: theme.spacing.unit * 3 },

  subtitle: { fontWeight: 700 },

  description: { whiteSpace: 'pre-line' },

  ...RENDERED_HTML(theme),
});
