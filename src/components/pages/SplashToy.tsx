import React from "react";
import Sketch from "react-p5";
import {setup, draw, windowResized, boidCanvas} from './boids/BoidCanvas';
import {sections} from "./Home";
import safeGetElementByID from "../utils/safeGetElementById";

let prevLoop: boolean = false;

class SplashToy extends React.Component {

    onScroll(event: Event) {
        // Checks if the page has been scrolled beneath the splash screen and pauses the SplashToy
        let boundingClient = safeGetElementByID(sections[0]).getBoundingClientRect();
        if (boundingClient.top < 10 && prevLoop) {
            boidCanvas.noLoop();
            prevLoop = false;
        } else if (boundingClient.top >= 10 && !prevLoop) {
            boidCanvas.loop();
            prevLoop = true;
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        return <Sketch setup={setup} draw={draw} windowResized={windowResized}/>;
    }
}

export default SplashToy;