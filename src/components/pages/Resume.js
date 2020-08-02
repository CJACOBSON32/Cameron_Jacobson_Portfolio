import React from 'react';
import ProfilePic from "../../Assets/CJacobson_Summer_Lab.jpg";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "../../css/Resume.css";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import theme from "../AppStyles";
import Skills from "./Skills";

const sectionTitle = {
    marginBottom: 20,
}

function Section(props) {
    var {title, ...other} = props;
    return (
        <Box {...other}>
            <Typography variant="h3" align="center" style={sectionTitle}>{title}</Typography>
            <Container><Divider variant="middle" style={{marginBottom: 30}}/></Container>
            {props.children}
        </Box>
    );
}

function Profile(props) {
    return (
        <Box className="horizontal-flex" {...props}>
            {/*Left Section*/}
            <Box className="flex-item">
                <Typography variant="h4">About Me</Typography>
                <div className="content">
                    <p>
                        An enthusiastic undergraduate looking for a summer internship in computer science.
                    </p>
                </div>
            </Box>

            {/*Profile Picture*/}
            <img src={ProfilePic} className="profile-img" alt="Cameron Jacobson"/>

            {/*Right Section*/}
            <Box className="flex-item">
                <Typography variant="h4">Details</Typography>
                <div className="content">
                    <div className="detail-field">
                        <Typography variant="h6">Name</Typography>
                        <p>Cameron Hyun-Jin Jacobson</p>
                    </div>
                    <div className="detail-field">
                        <Typography variant="h6">Location</Typography>
                        <p>Prospect Heights, Brooklyn, NY</p>
                    </div>
                </div>
            </Box>
        </Box>

    );
}

function Resume() {
    const lighterColor = theme.palette.background.paper;
    const padding = 40;
    return (
        <div>
            <Profile style={{padding: padding, backgroundColor: lighterColor}}/>
            <Section style={{padding: padding}} title="Skills">
                <Skills/>
            </Section>
        </div>
    );
}

export default Resume;