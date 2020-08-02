import React from "react";
import {animateScroll as scroll} from "react-scroll";
import AppBar from "@material-ui/core/AppBar";
import {StubbyTab, StubbyTabs} from "./StubbyTabs";
import Container from "@material-ui/core/Container";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: 0}
        this.handleChange = this.handleChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        // Generate Map to get the index of each section
        this.pageNameToIndex = {};
        for (let i=0; i<this.props.sections.length; i++) {
            this.pageNameToIndex[this.props.sections[i]] = i;
        }
    }

    barHeight = 48;

    handleChange = (event, newValue) => {
        // history.push(`/${indexToPageName[newValue]}`)
        window.removeEventListener('scroll', this.handleScroll);
        this.setState({selectedTab: newValue});
        let relativeElementPos = document.getElementById(this.props.sections[newValue]).getBoundingClientRect().y;
        scroll.scrollTo(window.pageYOffset + relativeElementPos - this.barHeight);
        setTimeout(() => window.addEventListener("scroll", this.handleScroll), 1000);
    }

    // Set the selected tab in the navbar to the current section when scrolling
    handleScroll(event) {
        for (let i = 0; i < this.props.sections.length; i++) {
            let section = this.props.sections[i];
            let boundingClient = document.getElementById(section).getBoundingClientRect();
            if (boundingClient.bottom > this.barHeight+1) {
                if (i !== this.state.selectedTab) {
                    this.setState({selectedTab: this.pageNameToIndex[section]});
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
        return(
            <AppBar id="MainBar" className="App-header" position="sticky" style={{height: this.barHeight}}>
                <Container>
                    <StubbyTabs value={this.state.selectedTab} onChange={this.handleChange} centered={true} variant='fullWidth' style={{justifyContent: 'evenly-spaced'}}>
                        <StubbyTab label="Profile"/>
                        <StubbyTab label="Skills"/>
                        <StubbyTab label="Projects"/>
                        <StubbyTab label="Contact"/>
                    </StubbyTabs>
                </Container>
            </AppBar>
        );
    }
}

export default NavBar;