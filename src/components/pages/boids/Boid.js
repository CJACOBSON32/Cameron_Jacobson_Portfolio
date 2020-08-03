function subVects(v1,v2) {
    let v3 = v1.copy();
    v3.sub(v2);
    return v3;
}

class Boid {
    constructor(p5, id, pos) {
        this.id = id;

        this.position = pos;
        this.velocity = p5.createVector(0,0);
        this.acceleration = p5.createVector(0,0);

        this.neighbors = [];
        this.chunk = undefined;

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
                    p5.line(this.renderPosition().x, this.renderPosition().y, boid.renderPosition().x, boid.renderPosition().y);
                }
            });

            p5.fill(color);
            p5.stroke(color);
            p5.translate(this.renderPosition().x, this.renderPosition().y);
            p5.rotate(theta);
            p5.beginShape(p5.TRIANGLES);
            p5.vertex(0, -this.r*2);
            p5.vertex(-this.r, this.r*2);
            p5.vertex(this.r, this.r*2);
            p5.endShape();
            p5.resetMatrix();
        }

        this.renderPosition = function() {
            return p5.createVector(this.position.x + this.chunk.flock.position.x, this.position.y + this.chunk.flock.position.x);
        }

        this.run = function(boids) {
            this.flock(boids);
            this.update();
            this.borders();

            // If this boids chunk is defined and it no longer contains this boid, move to the appropriate chunk
            if(this.chunk !== undefined && !this.chunk.contains(this.position)) {
                let flock = this.chunk.flock;

                // Calculate the new row and column based on the position
                let newRow = Math.floor(this.position.y / flock.chunkSize);
                let newCol = Math.floor(this.position.x / flock.chunkSize);
                let newChunk = flock.chunks[newRow][newCol];
                // Remove this boid from the old chunk and add it to the new one
                this.chunk.removeBoid(this.id);
                newChunk.addBoid(this);
            }

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
            if (this.position.x < 0) this.position.x = this.chunk.flock.width-1;
            if (this.position.y < 0) this.position.y = this.chunk.flock.height-1;
            if (this.position.x > this.chunk.flock.width) this.position.x = 0;
            if (this.position.y > this.chunk.flock.height) this.position.y = 0;
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

export default Boid;