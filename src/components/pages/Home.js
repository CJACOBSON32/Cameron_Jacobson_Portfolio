import React from 'react';
import '../../css/App.css';
import Projects from './Projects.tsx';
import Contact from './Contact.js';
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

var navBarHeight = 48;

class Home extends React.Component {

    componentDidMount() {
        let navBar = document.getElementById("MainBar");
        if (navBar !== null)
            navBarHeight = navBar.clientHeight;
    }

    render() {
        const lighterColor = "#2b2b2b";
        const padding = 40;

        const lastPageHeight = window.innerHeight - navBarHeight;

        return (
            <div className="Home">
                <Splash/>

                <NavBar sections={sections}/>

                <Profile style={{padding: padding, backgroundColor: lighterColor}} id="Profile"/>

                <Section style={{padding: padding}} id="Skills" title="Skills">
                    <Skills/>
                </Section>

                <Section style={{padding: padding, backgroundColor: lighterColor}} id="Projects" title="Projects">
                    <Projects/>
                </Section>

                <Section style={{padding: padding, height: lastPageHeight }} id="Contact" title="Contact">
                    <Contact/>
                </Section>
            </div>
        );
    }
}

export {sections};
export default Home;
