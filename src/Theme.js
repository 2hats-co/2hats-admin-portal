import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const primaryColor = '#f15a29';
const darkText = 'hsl(15, 90%, 40%)';
const lightPrimary = 'hsl(15, 88%, 95%)';
const borderRadius = 10;

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
            dark: primaryColor,
            darkText: darkText,
            light: lightPrimary,
        },
        secondary: {
            main: primaryColor,
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Helvetica Neue", Roboto, Arial, sans-serif',
        display2: { fontWeight: 500 },
        display1: { fontWeight: 500 },
        headline: { fontWeight: 500 },
        subheading: { fontWeight: 500 },
        title:{
            textTransform: 'capitalize',
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius,
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
                borderRadius: `${borderRadius}px !important`,
                flex: 1,
                transition: 'background-color .2s, color .2s',
            },
            label: {
                color: 'rgba(0,0,0,.87)',
                position: 'relative',
                zIndex: 99,
            },
            selected: {
                color: primaryColor,
                '& > span': { color: primaryColor },
                '&::after': {
                    backgroundColor: lightPrimary,
                    opacity: .8,
                },
            },
        },
        MuiButton: {
            label: {
                '& svg': { marginRight: 8 }
            }
        },
        MuiFab: {
            extended: {
                '& svg': {
                    marginRight: 8,
                },
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: 'rgba(0,0,0,.75)',
                fontSize: 12,
            },
            popper: {
                opacity: 1,
            },
        },
        MuiTab: {
            root: {
                minWidth: '64px !important',
                fontSize: '.875rem !important',
            },
        },
        MuiChip: {
            root: {
                '&:not(:last-of-type)': { marginRight: 8 }
            },
            colorPrimary: {
                color: darkText,
                backgroundColor: lightPrimary,
                '&:focus': {
                    backgroundColor: primaryColor,
                    color: '#fff'
                },
            },
            iconColorPrimary: {
                opacity: .87,
            },
            deleteIconColorPrimary: {
                color: `inherit !important`,
                opacity: .87,
            },
        },
        MuiAvatar: {
            img: {
                backgroundColor: lightPrimary,
            },
            colorDefault: {
                backgroundColor: lightPrimary,
                color: primaryColor,
            },
        },
    },
});

export default Theme;
