import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const primaryColor = '#f15a29';
const borderRadius = 4;

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
            dark: primaryColor,
            darkText: 'hsl(15, 100%, 30%)',
            light: 'hsl(15, 88%, 95%)',
        },
        secondary: {
            main: primaryColor,
        },
    },
    typography: {
        fontFamily: '"Helvetica Neue", Roboto, Arial, sans-serif',
        headline: {
            fontWeight: 500,
        },
        subheading: {
            fontWeight: 500,
        },
        title:{
            textTransform: 'capitalize',
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 10,
        roundBorderRadius: 20,
        smallBorderRadius: 4,
    },
    overrides: {
        MuiToggleButton: {
            root: {
                borderRadius: `${borderRadius}px !important`,
                flex: 1,
                color: primaryColor,
                transition: 'background-color .2s',
            },
            label: {
                color: 'rgba(0,0,0,.87)',
                textTransform: 'none',
                position: 'relative',
                zIndex: 99,
            },
            selected: {
                color: primaryColor,
            },
        },
        MuiButton: {
            '& svg': {
                marginRight: 8,
            },
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
    },
});

export default Theme;
