import React from "react";
import Sketch from "react-p5";
import {setup, draw, windowResized, p5Functions} from './boids/BoidCanvas.js';
import {animateScroll as scroll} from "react-scroll";
import {sections} from "./Home";

var prevLoop = true;

class SplashToy extends React.Component {

    onScroll(event) {
        let boundingClient = document.getElementById(sections[0]).getBoundingClientRect()
        if (boundingClient.top < 10 && prevLoop) {
            p5Functions.noLoop();
            prevLoop = false;
        } else if (boundingClient.top >= 10 && !prevLoop) {
            p5Functions.loop();
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