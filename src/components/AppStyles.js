import {createMuiTheme} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";
import {blue} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: indigo['400'],
            light: indigo['A100']
        },
        secondary: orange,
        background: blue,
    },
})

export default theme;