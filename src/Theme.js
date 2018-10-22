import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const primaryColor = '#f15a29';
const borderRadius = 4;

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
    },
    typography: {
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        headline: {
            fontWeight: 600,
        },
        subheading: {
            fontWeight: 500,
        },
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
            },
            selected: {
                color: primaryColor,
            },
        },
        MuiButton: {
            label: {
                textTransform: 'none',
                fontWeight: 700,
            },
        },
    },
});

export default Theme;
