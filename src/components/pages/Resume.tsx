import React from 'react';
import "../../css/Resume.css";
import theme from "../AppStyles";
import Skills from "./Skills";
import Profile from "./Profile";
import Section from "../Section";

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