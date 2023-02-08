import Typography from "@material-ui/core/Typography";
import {Link as ScrollLink} from "react-scroll";
import Button from "@material-ui/core/Button";
import theme from "../AppStyles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Box from "@material-ui/core/Box";
import React, {useEffect} from "react";
import SplashToy from "./SplashToy";
import Database from "../utils/Database/Database";

class Splash extends React.Component<any, any> {

    // /**
    //  * Adds an entry to the databse whenever someone clicks 'enter'. This is just to test the database
    //  * @private
    //  */
    // private enter() {
    //     const database: Database = Database.getInstance();
    //
    //     database.addEntry();
    // }

    render() {
        return (
            <Box>
                <SplashToy/>
                {/*<Box style={{*/}
                {/*    height: "100vh",*/}
                {/*    display: "flex",*/}
                {/*    flexDirection: "column",*/}
                {/*    justifyContent: "center",*/}
                {/*    alignItems: "center",*/}
                {/*    gap: 20,*/}
                {/*    marginTop: "-100vh",*/}
                {/*    position: "relative"*/}
                {/*}}>*/}
                {/*    <Typography variant="h2" component="div" style={{textAlign: "center", userSelect: "none" }}>Cameron Jacobson's Portfolio</Typography>*/}
                {/*    <ScrollLink activeClass="Active" to="MainBar" spy={true} smooth={true}>*/}
                {/*        <Button variant="outlined" style={{paddingRight: 5, borderColor: theme.palette.secondary.main, borderWidth: 3}}>*/}
                {/*            <Typography variant="h5">Enter</Typography>*/}
                {/*            <ArrowDropDownIcon fontSize="large" style={{marginLeft: 5}}/>*/}
                {/*        </Button>*/}
                {/*    </ScrollLink>*/}
                {/*</Box>*/}
            </Box>
        );
    }
}

export default Splash;