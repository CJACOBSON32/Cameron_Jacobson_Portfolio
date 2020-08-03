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

        this.neighbors = [];

        // Constraints
        this.r = 7;
        this.maxSpeed = 3;
        this.maxForce = 0.03;

        this.neighborDist = 50;
        this.desiredSeparation = 25;    // Should be less than neighborDist

        this.forceMultiplier = 1;       // Multiplies all of the following forces
        this.separationMultiplier = 2;  // Forces boids to separate to desiredSeparation
        this.cohesionMultiplier = 0.1;  // Forces boids towards one another when within neighborDist
        this.alignmentMultiplier = 0.2; // Forces boids to turn in the same direction as those within neighborDist
        this.mouseMultiplier = 10;      // Forces boids away from the mouse. Make negative to attract them to the mouse

        this.render = function() {
            // Draw a triangle rotated in the direction of velocity
            let theta = this.velocity.heading() + p5.radians(90);

            let color = p5.color("rgba(82,108,193,0.9)");
            let lineColor = p5.color("rgb(255, 128, 26)");

            // Draw lines between all boids in range with alphas inversely proportional to their distance
            this.neighbors.forEach((boid, i) => {
                // Need to check if their in range again because it may not have been updated
                if (this.position.dist(boid.position) < this.neighborDist) {
                    lineColor.alpha = 1 / (this.position.dist(boid.position) / 2);
                    p5.stroke(lineColor);
                    p5.line(this.position.x, this.position.y, boid.position.x, boid.position.y);
                }
            });

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
            // Get all boids within range
            this.neighbors = [];
            boids.forEach((boid, i) => {
                let d = this.position.dist(boid.position);
                if(d < this.neighborDist)
                    this.neighbors.push(boid);
            });

            let sep = this.separate(this.neighbors);
            let ali = this.align(this.neighbors);
            let coh = this.cohesion(this.neighbors);

            // Get mouse position and calculate a repulsion vector
            let mouse = p5.createVector(0,0);
            let mousePos = p5.createVector(p5.mouseX, p5.mouseY);
            if(this.position.dist(mousePos) < 200)
                mouse = this.seek(mousePos).mult(-1);

            // Force weights
            sep.mult(this.forceMultiplier*this.separationMultiplier);
            ali.mult(this.forceMultiplier*this.alignmentMultiplier);
            coh.mult(this.forceMultiplier*this.cohesionMultiplier);
            mouse.mult(this.forceMultiplier*this.mouseMultiplier);

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
                if (d > 0) {
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
                if (d > 0) {
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