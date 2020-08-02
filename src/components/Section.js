import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import React from "react";

function Section(props) {
    const sectionTitle = {
        marginBottom: 20,
    }
    var {title, ...other} = props;

    return (
        <Box {...other}>
            <Typography variant="h3" align="center" style={sectionTitle}>{title}</Typography>
            <Container><Divider variant="middle" style={{marginBottom: 30}}/></Container>
            {props.children}
        </Box>
    );
}

export default Section;