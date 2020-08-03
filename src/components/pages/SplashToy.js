import React from "react";
import Sketch from "react-p5";
import Flock from "./boids/Flock";
import Boid from "./boids/Boid";

function SplashToy() {

    let flock = undefined;

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(p5.windowWidth-20, p5.windowHeight).parent(canvasParentRef);

        let boidSize = 7;
        flock = new Flock(p5, p5.createVector(-boidSize,-boidSize), p5.width + (2*boidSize), p5.height + (2*boidSize));

        for (let i=0; i<0; i++) {
            let newBoid = new Boid(p5, i, p5.createVector(Math.random() * p5.width, Math.random() * p5.height));

            // Set the velocity in a random direction
            let angle = Math.random() * (2 * Math.PI);
            let newVel = p5.createVector(Math.cos(angle), Math.sin(angle));
            newVel.setMag(newBoid.maxSpeed);
            newBoid.velocity = newVel;

            flock.addBoid(newBoid);
        }
    };

    const draw = (p5) => {
        p5.background(48);
        flock.renderChunks();
        flock.run();
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default SplashToy;