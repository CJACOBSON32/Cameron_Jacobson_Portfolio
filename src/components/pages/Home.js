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

const pageNameToIndex = {
    Profile: 0,
    Skills: 1,
    Projects: 2,
    Contact: 3
};

const sections = [
    "Profile",
    "Skills",
    "Projects",
    "Contact"
];

//TODO: Re-implement React router

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab: 0}
        this.handleChange = this.handleChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    barHeight = 48;

    handleChange = (event, newValue) => {
        // history.push(`/${indexToPageName[newValue]}`)
        window.removeEventListener('scroll', this.handleScroll);
        this.setState({selectedTab: newValue});
        let relativeElementPos = document.getElementById(sections[newValue]).getBoundingClientRect().y;
        scroll.scrollTo(window.pageYOffset + relativeElementPos - this.barHeight);
        setTimeout(() => window.addEventListener("scroll", this.handleScroll), 1000);
    }

    // Set the selected tab in the navbar to the current section when scrolling
    handleScroll(event) {
        for (let i = 0; i < sections.length; i++) {
            let section = sections[i];
            let boundingClient = document.getElementById(section).getBoundingClientRect();
            if (boundingClient.bottom > this.barHeight) {
                if (i !== this.state.selectedTab) {
                    this.setState({selectedTab: pageNameToIndex[section]});
                }
                break;
            }
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {

        const lighterColor = "#2b2b2b";
        const padding = 40;

        return (
            <div className="Home">
                <Splash/>
                <AppBar id="MainBar" className="App-header" position="sticky" style={{height: this.barHeight}}>
                    <StubbyTabs value={this.state.selectedTab} onChange={this.handleChange} centered={true}>
                        <StubbyTab label="Profile"/>
                        <StubbyTab label="Skills"/>
                        <StubbyTab label="Projects"/>
                        <StubbyTab label="Contact"/>
                    </StubbyTabs>
                </AppBar>
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
