import React from 'react';
import '../../css/App.css';
import {StubbyTabs, StubbyTab} from '../StubbyTabs.js';
import Resume from './Resume.js';
import Projects from './Projects.js';
import Contact from './Contact.js';
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";


const Home = props => {
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
            <AppBar className="App-header" position="static">
                <Typography variant="h2" component="div" align="center">
                    Cameron Jacobson's Portfolio
                </Typography>
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
