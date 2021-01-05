import React from "react";
import {animateScroll as scroll} from "react-scroll";
import AppBar from "@material-ui/core/AppBar";
import {StubbyTab, StubbyTabs} from "./StubbyTabs";
import Container from "@material-ui/core/Container";
import safeGetElementByID from "./utils/safeGetElementById";

class NavBar extends React.Component<any, any> {
    pageNameToIndex: Map<string, number>;

    constructor(props: any) {
        super(props);
        this.state = {selectedTab: 0}
        this.handleChange = this.handleChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        // Generate Map to get the index of each section
        this.pageNameToIndex = new Map();
        for (let i=0; i<this.props.sections.length; i++) {
            this.pageNameToIndex.set(this.props.sections[i], i);
        }
    }

    barHeight = 48;

    // Smooth scroll to the section that was clicked in the NavBar. Temporarily remove the handleScroll eventlistener to prevent lag
    handleChange = (event: Event, newValue: number) => {
        // history.push(`/${indexToPageName[newValue]}`)
        window.removeEventListener("scroll", this.handleScroll);
        this.setState({selectedTab: newValue});
        let relativeElementPos = safeGetElementByID(this.props.sections[newValue]).getBoundingClientRect().y;
        scroll.scrollTo(window.pageYOffset + relativeElementPos - this.barHeight);
        setTimeout(() => window.addEventListener("scroll", this.handleScroll), 1000);
    }

    // Set the selected tab in the navbar to the current section when scrolling
    handleScroll = (event: Event) => {
        for (let i = 0; i < this.props.sections.length; i++) {
            let section = this.props.sections[i];
            let boundingClient = safeGetElementByID(section).getBoundingClientRect();
            if (boundingClient.bottom > this.barHeight+1) {
                if (i !== this.state.selectedTab) {
                    this.setState({selectedTab: this.pageNameToIndex.get(section)});
                }
                break;
            }
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
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