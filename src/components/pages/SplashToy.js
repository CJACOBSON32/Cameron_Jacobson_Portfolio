import React from "react";
import Sketch from "react-p5";

function subVects(v1,v2) {
    let v3 = v1.copy();
    v3.sub(v2);
    return v3;
}

class Boid {
    constructor(p5, pos) {
        this.position = pos;

        this.velocity = p5.createVector(0,0);
        this.acceleration = p5.createVector(0,0);

        this.r = 7;
        this.maxSpeed = 3;
        this.maxForce = 0.03;

        this.neighborDist = 50;
        this.desiredSeparation = 25;

        this.forceMultiplier = 1;

        this.render = function() {
            // Draw a triangle rotated in the direction of velocity
            let theta = this.velocity.heading() + p5.radians(90);
            // heading2D() above is now heading() but leaving old syntax until Processing.js catches up

            let color = p5.color("rgba(82,108,193,50)");

            p5.fill(color);
            p5.stroke(color);
            p5.translate(this.position.x, this.position.y);
            p5.rotate(theta);
            p5.beginShape(p5.TRIANGLES);
            p5.vertex(0, -this.r*2);
            p5.vertex(-this.r, this.r*2);
            p5.vertex(this.r, this.r*2);
            p5.endShape();
            p5.resetMatrix();
        }

        //"#526cc1"

        this.run = function(boids) {
            this.flock(boids);
            this.update();
            this.borders();
            this.render();
        }

        this.update = function() {
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }

        // Wraps position to the other side when moving offscreen
        this.borders = function() {
            if (this.position.x < - this.r) this.position.x = p5.width+this.r;
            if (this.position.y < - this.r) this.position.y = p5.height+this.r;
            if (this.position.x > p5.width+this.r) this.position.x = - this.r;
            if (this.position.y > p5.height+this.r) this.position.y = - this.r;
        }

        this.applyForce = function(force) {
            this.acceleration.add(force);
        }

        this.flock = function(boids) {
            let sep = this.separate(boids);
            let ali = this.align(boids);
            let coh = this.cohesion(boids);
            let mouse = p5.createVector(0,0);
            let mousePos = p5.createVector(p5.mouseX, p5.mouseY);
            if(this.position.dist(mousePos) < 200)
                mouse = this.seek(mousePos).mult(-1);

            // Force weights
            sep.mult(this.forceMultiplier*2);
            ali.mult(this.forceMultiplier*1.0);
            coh.mult(this.forceMultiplier*1.0);
            mouse.mult(this.forceMultiplier*10);

            // Apply forces
            this.applyForce(sep);
            this.applyForce(ali);
            this.applyForce(coh);
            this.applyForce(mouse);
            this.applyForce(this.forward());
        }

        this.forward = function() {
            let velCopy = this.velocity.copy();
            velCopy.normalize();
            return velCopy;
        }

        this.seek = function(target) {
            // Normalized vector pointing towards the target
            let targetVel = subVects(target, this.position);
            targetVel.setMag(this.maxSpeed);

            // Delta vector to targetVel to apply an appropriate force
            let steer = subVects(targetVel, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        }

        // Returns the force to steer away from nearby boids
        this.separate = function(boids) {
            let steer = p5.createVector(0, 0);
            let count = 0;
            // For every boid in the system, check if it's too close
            boids.forEach((other, i) => {
                let d = this.position.dist(other.position);
                // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
                if ((d > 0) && (d < this.desiredSeparation)) {
                    // Calculate vector pointing away from neighbor
                    let diff = subVects(this.position, other.position);
                    diff.normalize();
                    diff.div(d);        // Weight by distance
                    steer.add(diff);
                    count++;            // Keep track of how many
                }
            });
            // Average -- divide by how many
            if (count > 0) {
                steer.div(count);
            }

            // As long as the vector is greater than 0
            if (steer.mag() > 0) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.setMag(this.maxSpeed);
                steer.sub(this.velocity);
                steer.limit(this.maxForce);
            }
            return steer;
        }

        // Steer towards the average velocity of all nearby boids
        this.align = function(boids) {
            let sum = p5.createVector(0, 0);
            let count = 0;
            boids.forEach((other, i) => {
                let d = this.position.dist(other.position);
                if ((d > 0) && (d < this.neighborDist)) {
                    sum.add(other.velocity);
                    count++;
                }
            });
            if (count > 0) {
                sum.div(count);

                // Implement Reynolds: Steering = Desired - Velocity
                sum.setMag(this.maxspeed);
                let steer = subVects(sum, this.velocity);
                steer.limit(this.maxforce);
                return steer;
            }
            else {
                return p5.createVector(0, 0);
            }
        }

        // Steer towards the average position of all nearby boids
        this.cohesion = function(boids) {
            let sum = p5.createVector(0, 0);   // Start with empty vector to accumulate all positions
            let count = 0;
            boids.forEach((other, i) => {
                let d = this.position.dist(other.position);
                if ((d > 0) && (d < this.neighborDist)) {
                    sum.add(other.position); // Add position
                    count++;
                }
            });
            if (count > 0) {
                sum.div(count);
                return this.seek(sum);  // Steer towards the position
            }
            else {
                return p5.createVector(0, 0);
            }
        }
    }
}

class Flock {
    constructor() {
        this.boids = [];

        this.run = function() {
            this.boids.forEach((boid, i) => {
                boid.run(this.boids);
            });
        }

        this.addBoid = function(boid) {
            this.boids.push(boid);
        }
    }
}

function SplashToy() {

    let flock = new Flock();

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        for (let i=0; i<100; i++) {
            let newBoid = new Boid(p5, p5.createVector(Math.random() * p5.width, Math.random() * p5.height));

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
        flock.run();
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
    };

    return <Sketch setup={setup} draw={draw} />;
}

export default SplashToy;