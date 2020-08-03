class BoidChunk {
    constructor(p5, row, col, width, height, flock) {
        this.row = row;
        this.column = col;

        this.height = height;
        this.width = width;

        this.boids = [];
        this.flock = flock;

        // Remove a specified boid by the boid id
        this.removeBoid = function(id) {
            for(let i=0; i<this.boids.length; i++) {
                let boid = this.boids[i];
                if (boid.id === id) {
                    this.boids.splice(i, 1);
                    break;
                }
            }
        }

        // **Use this instead of manually setting the boid chunk**
        // Adds the boid and sets its chunk to this
        this.addBoid = function(boid) {
            this.boids.push(boid);
            boid.chunk = this;
        }

        // Checks if this cell contains given coordinates
        this.contains = function(coordinates) {
            let xContained = (coordinates.x >= this.width*this.row) && (coordinates.x < this.width*(this.row+1));
            let yContained = (coordinates.y >= this.height*this.column) && (coordinates.y < this.height*(this.column+1));

            return xContained && yContained;
        }

        this.position = function() {
            return this.flock.position.copy().add(
                p5.createVector(this.flock.position.x + (this.column * flock.chunkSize),
                    this.flock.position.y + (this.row * flock.chunkSize))
            );
        }
    }
}

export default BoidChunk;