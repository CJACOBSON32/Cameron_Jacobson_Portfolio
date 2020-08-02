import React from 'react';
import '../../css/App.css';
import {StubbyTabs, StubbyTab} from '../StubbyTabs.js';
import Projects from './Projects.js';
import Contact from './Contact.js';
import AppBar from "@material-ui/core/AppBar";
import { Link } from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll';
import Splash from "./Splash";
import Profile from "./Profile";
import Skills from "./Skills";
import Section from "../Section";
import NavBar from "../NavBar";

const sections = [
    "Profile",
    "Skills",
    "Projects",
    "Contact"
];

//TODO: Re-implement React router

class Home extends React.Component {

    render() {

        const lighterColor = "#2b2b2b";
        const padding = 40;

        return (
            <div className="Home">
                <Splash/>
                <NavBar sections = {sections}/>
                <Profile style={{padding: padding, backgroundColor: lighterColor}} id="Profile"/>
                <Section style={{padding: padding}} id="Skills" title="Skills">
                    <Skills/>
                </Section>
                <Section style={{padding: padding, backgroundColor: lighterColor}} id="Projects" title="Projects">
                    <Projects/>
                </Section>
                <Section style={{padding: padding}} id="Contact" title="Contact">
                    <Contact/>
                </Section>
            </div>
        );
    }
}

export default Home;
