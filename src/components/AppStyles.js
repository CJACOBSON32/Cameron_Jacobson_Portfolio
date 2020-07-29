import {createMuiTheme} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import orange from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: indigo,
        secondary: orange,
    },
})

export default theme;