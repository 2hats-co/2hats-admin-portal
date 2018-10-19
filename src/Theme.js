import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F15A29',
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
});

export default Theme;
