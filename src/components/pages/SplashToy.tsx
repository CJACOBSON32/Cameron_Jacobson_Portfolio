import React from "react";
import Sketch from "react-p5";
import {BoidCanvas, boidCanvasRef} from './canvas/boids/BoidCanvas';
import {sections} from "./Home";
import safeGetElementByID from "../utils/safeGetElementById";

let prevLoop: boolean = false;

class SplashToy extends React.Component {

    boidCanvas: BoidCanvas = new BoidCanvas();

    onScroll(event: Event) {
        // Checks if the page has been scrolled beneath the splash screen and pauses the SplashToy
        let boundingClient = safeGetElementByID(sections[0]).getBoundingClientRect();
        if (boundingClient.top < 10 && prevLoop) {
            boidCanvasRef.noLoop();
            prevLoop = false;
        } else if (boundingClient.top >= 10 && !prevLoop) {
            boidCanvasRef.loop();
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
        // @ts-ignore
	    return <Sketch setup={this.boidCanvas.setup} draw={this.boidCanvas.draw} windowResized={this.boidCanvas.windowResized}/>;
    }
}

export default SplashToy;