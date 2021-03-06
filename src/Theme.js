import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const FONT_STACK = '"Helvetica Neue", Roboto, Arial, sans-serif';
const ORANGE_COLOR = 'hsl(15, 88%, 55%)'; // #f15a29
// const ORANGE_DARK_TEXT = 'hsl(15, 90%, 40%)';
// const ORANGE_LIGHT = 'hsl(15, 88%, 95%)';
const BORDER_RADIUS = 10;

const modifyColor = (hsl, elem, mod) => {
  const arr = hsl
    .replace('hsl(', '')
    .replace(')', '')
    .replace('%', '')
    .replace(' ', '')
    .split(',')
    .map(x => parseInt(x, 10));
  const editable = { h: arr[0], s: arr[1], l: arr[2] };
  editable[elem] += mod;
  if (elem !== 'h' && editable[elem] > 90) editable[elem] = 90;
  if (elem !== 'h' && editable[elem] < 10) editable[elem] = 10;
  return `hsl(${editable.h}, ${editable.s}%, ${editable.l}%)`;
};

function generateTheme(theme, themeColor) {
  let primaryColor = themeColor || ORANGE_COLOR;
  let primaryDarkText = modifyColor(
    primaryColor,
    'l',
    theme === 'dark' ? -30 : -20
  );
  primaryDarkText = modifyColor(
    primaryDarkText,
    's',
    theme === 'dark' ? -30 : -10
  );
  let primaryLight = modifyColor(primaryColor, 'l', 40);

  if (theme === 'dark') {
    const x = primaryDarkText;
    primaryDarkText = primaryLight;
    primaryLight = x;
  }

  const baseTheme = {
    palette: {
      primary: {
        main: primaryColor,
        dark: primaryColor,
        darkText: primaryDarkText,
        light: primaryLight,
        contrastText: '#fff',
      },
      secondary: {
        main: primaryColor,
      },
      background: {
        default: '#f5f5f5',
      },
    },
    typography: {
      useNextVariants: true,
      fontFamily: FONT_STACK,
      h3: { fontWeight: 500 },
      h4: { fontWeight: 500 },
      h5: { fontWeight: 500 },
      subtitle1: { fontWeight: 500 },
      h6: { textTransform: 'none', lineHeight: 1.4 },
      body2: { lineHeight: 1.45 },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: BORDER_RADIUS,
      roundBorderRadius: 20,
      smallBorderRadius: 4,
    },
    overrides: {
      MuiToggleButtonGroup: {
        root: {
          boxShadow: 'none !important',
        },
      },
      MuiToggleButton: {
        root: {
          borderRadius: `${BORDER_RADIUS}px !important`,
          flex: 1,
          transition: 'background-color .2s, color .2s',

          '&$selected': {
            color: primaryColor,
            '& > span': { color: primaryColor },

            backgroundColor: primaryLight,
            '&:hover': { backgroundColor: primaryLight },
          },
        },
        label: { color: 'rgba(0,0,0,.87)' },
      },
      MuiButton: {
        label: {
          '& svg': { marginRight: 8 },
        },
        containedPrimary: { color: '#fff' },
      },
      MuiFab: {
        primary: { color: '#fff' },
        extended: {
          '& svg': { marginRight: 8 },
        },
      },
      MuiTooltip: {
        tooltip: {
          backgroundColor: 'rgba(0,0,0,.75)',
          fontSize: 12,
        },
        popper: { opacity: 1 },
      },
      MuiTab: {
        root: {
          minWidth: '64px !important',
          fontSize: '.875rem !important',
        },
        textColorPrimary: {
          color: 'rgba(0,0,0,.87)',
          '& svg': { opacity: 0.87 },
        },
      },
      MuiChip: {
        root: {
          height: 'auto',
          minHeight: 32,
          '&:not(:last-of-type)': { marginRight: 8 },
        },
        label: { whiteSpace: 'normal' },
        colorPrimary: {
          color: primaryDarkText,
          backgroundColor: primaryLight,
          '&:focus': {
            backgroundColor: primaryColor,
            color: '#fff',
          },
        },
        iconColorPrimary: {
          opacity: 0.87,
        },
        deleteIconColorPrimary: {
          color: `inherit !important`,
          opacity: 0.87,
        },
      },
      MuiAvatar: {
        colorDefault: {
          backgroundColor: primaryLight,
          color: primaryColor,
          fontWeight: 500,
        },
        img: {
          backgroundColor: primaryLight,
        },
      },
      MuiFormLabel: {
        root: {
          '&$focused': { color: `${primaryColor} !important` },
        },
      },
      MuiInput: {
        underline: {
          '&::after': { borderBottomColor: primaryColor },
        },
      },
      MuiFilledInput: {
        root: { borderRadius: BORDER_RADIUS },
        underline: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
      MuiBadge: {
        badge: { fontWeight: 700 },
      },
      MuiInputAdornment: {
        positionStart: { marginBottom: 2 },
      },
      MuiLink: {
        root: { fontFamily: FONT_STACK },
        button: { fontFamily: FONT_STACK },
      },
      MuiCardActionArea: {
        focusHighlight: { opacity: '0 !important' },
      },
      MuiIconButton: {
        label: { fontFamily: FONT_STACK },
      },
    },
  };

  if (theme !== 'dark') return createMuiTheme(baseTheme);

  return createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      background: {
        default: '#111',
        paper: '#333',
      },
      // divider: 'rgba(0,0,0,.67)',
      type: 'dark',
    },
    overrides: {
      ...baseTheme.overrides,
      MuiToggleButton: {
        ...baseTheme.overrides.MuiToggleButton,

        root: {
          ...baseTheme.overrides.MuiToggleButton.root,

          '&$selected': {
            color: primaryDarkText,
            '& > span': { color: primaryDarkText },

            backgroundColor: primaryLight,
            '&:hover': { backgroundColor: primaryLight },
          },
        },

        label: {
          ...baseTheme.overrides.MuiToggleButton.label,
          color: 'rgba(255,255,255,.87)',
        },
      },
      MuiIconButton: {
        colorPrimary: {
          color: primaryDarkText,
        },
      },
      MuiButton: {
        ...baseTheme.overrides.MuiButton,
        textPrimary: {
          color: primaryDarkText,
        },
        outlinedPrimary: {
          color: primaryDarkText,
        },
      },
      MuiAvatar: {
        ...baseTheme.overrides.MuiAvatar,
        colorDefault: {
          ...baseTheme.overrides.MuiAvatar.colorDefault,
          color: primaryDarkText,
        },
        img: {
          ...baseTheme.overrides.MuiAvatar.img,
          color: primaryDarkText,
        },
      },
      MuiTooltip: {
        ...baseTheme.overrides.MuiTooltip,
        tooltip: {
          ...baseTheme.overrides.MuiTooltip.tooltip,
          backgroundColor: 'rgba(255,255,255,.9)',
          color: 'rgba(0,0,0,.87)',
        },
      },
      MuiTab: {
        ...baseTheme.overrides.MuiTab,
        root: {
          ...baseTheme.overrides.MuiTab.root,
          '&$selected': { color: `${primaryDarkText} !important` },
        },
        textColorPrimary: { color: '#fff' },
      },
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(0,0,0,.75)',
        },
      },
      MuiFormLabel: {
        root: { $focused: { color: `${primaryDarkText} !important` } },
      },
      MuiCheckbox: {
        root: { $checked: { color: `${primaryDarkText} !important` } },
      },
      MuiSwitch: {
        root: { $checked: { color: `${primaryDarkText} !important` } },
      },
    },
  });
}

export default generateTheme;
export { ORANGE_COLOR };
