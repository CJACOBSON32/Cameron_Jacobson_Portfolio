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

        let spawnWidth = 0.3 * p5.width;
        let spawnHeight = 0.3 * p5.height;
        for (let i=0; i<150; i++) {
            let newBoid = new Boid(p5, i, p5.createVector(
                (Math.random() * spawnWidth) + (p5.width / 2) - (spawnWidth/2),
                (Math.random() * spawnHeight) + (p5.height / 2) - (spawnHeight/2)));
            newBoid.r = boidSize;

            // Set the velocity in a random direction
            let angle = Math.random() * (2 * Math.PI);
            let newVel = p5.createVector(Math.cos(angle), Math.sin(angle));
            newVel.setMag(newBoid.maxSpeed);
            newBoid.velocity = newVel;

            flock.addBoid(newBoid);
        }
    };



    let frame = 0;
    let frameRate = 60;
    let deltaTime = 0;

    function performaceDetails(p5) {
        // Display dev information (framerate and delta time)
        p5.fill(0);
        p5.rect(0,0,200,50);
        p5.fill(255);
        if (frame % 20 === 0) {
            frameRate = Math.round(p5.frameRate());
            deltaTime = p5.deltaTime;
        }
        p5.text(`${frameRate} fps`, 10, 40);
        p5.text(`Delta t: ${frameRate} millis`, 10, 25);
    }
    const draw = (p5) => {
        p5.background(48);
        //flock.renderChunks();
        flock.run();

        //performaceDetails(p5);
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        frame++;
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default SplashToy;