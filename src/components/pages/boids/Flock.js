import BoidChunk from "./BoidChunk";

class Flock {
    constructor(p5, pos, width, height) {
        this.position = pos;
        this.width = width;
        this.height = height;

        this.chunks = [];
        this.chunkSize = undefined;
        this.numCols = undefined;
        this.numRows = undefined;

        // Runs every boid in every chunk
        this.run = function() {
            this.chunks.forEach((boidRow, row) => {
                boidRow.forEach((boidCell, col) => {
                    boidCell.boids.forEach((boid, i) => {
                        // Get all boids in current and neighboring chunks
                        let neighboringBoids = this.allBoidsIn(this.cellAndNeighboring(row,col))
                        boid.run(neighboringBoids);
                    });
                });
            });
        }

        // Returns an array containing the chunk at the given row and column and its neighbors
        this.cellAndNeighboring = function(chunkRow, chunkCol) {
            let localChunks = [];
            let beginningRow = Math.max(chunkRow - 1, 0);
            let beginningCol = Math.max(chunkCol - 1, 0);
            let endingRow = Math.min(chunkRow + 1, this.numRows-1);
            let endingCol = Math.min(chunkCol + 1, this.numCols-1);

            for(let row=beginningRow; row <= endingRow; row++) {
                for(let col=beginningCol; col <= endingCol; col++) {
                    localChunks.push(this.chunks[row][col]);
                    if (this.chunks[row][col] === undefined)
                        console.log(`Chunk [${row}] [${col}] is undefined`);
                }
            }

            return localChunks;
        }

        // Returns a list of all the boids in the given list of chunks
        this.allBoidsIn = function(chunks) {
            let boids = [];
            chunks.forEach((chunk, i) => {
                chunk.boids.forEach((boid, j) => {
                    boids.push(boid);
                });
            });

            return boids;
        }

        this.addBoid = function(boid) {
            // The first boid added determines the chunk size
            if(this.chunks.length === 0) {
                this.generateChunks(boid.neighborDist);
            }

            // Calculate which chunk the boid should be placed in and add it
            let boidRow = Math.floor(boid.position.y / this.chunkSize);
            let boidCol = Math.floor(boid.position.x / this.chunkSize);
            (this.chunks[boidRow][boidCol]).addBoid(boid);
        }

        // Create an array of chunks based on the screen size and cell size
        this.generateChunks = function(chunkSize) {
            this.chunkSize = chunkSize;
            this.numRows = Math.ceil(this.height / this.chunkSize);
            console.log(`set numRows to ${this.numRows}`);
            this.numCols = Math.ceil(this.width / this.chunkSize);
            console.log(`set numCols to ${this.numCols}`);
            for (let row=0; row<this.numRows; row++) {
                let currentRow = [];
                for (let col=0; col<this.numCols; col++) {
                    currentRow.push(new BoidChunk(p5, row, col, this.chunkSize, this.chunkSize, this));
                }
                this.chunks.push(currentRow);
            }

            this.width = this.numCols*this.chunkSize;
            this.height = this.numRows*this.chunkSize;
        }

        p5.stroke("rgba(0,147,246,1)");
        this.renderChunks = function() {
            this.chunks.forEach((chunkRow, row) => {
                chunkRow.forEach((chunk, col) => {
                    let fillColor = p5.color("rgba(0,147,246,0)");
                    fillColor.alpha = chunk.boids.length;
                    p5.fill(fillColor);
                    p5.rect(this.position.x + chunk.position().x, this.position.y + chunk.position().y, chunk.width, chunk.height);
                });
            });

        }
    }
}

export default Flock;