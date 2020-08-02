import React from 'react';
import '../../css/App.css';
import {StubbyTabs, StubbyTab} from '../StubbyTabs.js';
import Resume from './Resume.js';
import Projects from './Projects.js';
import Contact from './Contact.js';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import theme from "../AppStyles";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import Splash from "./Splash";

function Home(props) {
    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const pageNameToIndex = {
        Resume: 0,
        Projects: 1,
        Contact: 2
    };

    const indexToPageName = {
        0 : "Resume",
        1 : "Projects",
        2 : "Contact"
    };

    const [selectedTab, setSelectedTab] = React.useState(pageNameToIndex[page]);
    const handleChange = (event, newValue) => {
        history.push(`/${indexToPageName[newValue]}`)
        setSelectedTab(newValue);
    };

    return (
        <div className="Home">
            <Splash/>
            <AppBar id="MainBar" className="App-header" position="sticky">
                <StubbyTabs value={selectedTab} onChange={handleChange} centered={true}>
                    <StubbyTab label="Resume"/>
                    <StubbyTab label="Projects"/>
                    <StubbyTab label="Contact"/>
                </StubbyTabs>
            </AppBar>
            {selectedTab === 0 && <Resume/>}
            {selectedTab === 1 && <Projects/>}
            {selectedTab === 2 && <Contact/>}
        </div>
    );
}

export default Home;
