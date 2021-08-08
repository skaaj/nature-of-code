const canvasSize = 750;
const colorSpeed = 0.5;
let state;

function setup() {
    state = new State(100);
    // dom
    select("body").style("background", "#202122");
    // canvas
    createCanvas(canvasSize, canvasSize);
    colorMode(HSB, 100);
    background(0);
    frameRate(30);
}

function draw() {
    // draw state
    const grid = state.grid;
    const cellCount = state.size;
    const cellSize = canvasSize / cellCount;
    const origin = cellSize / 2;
    
    background(0);
    strokeWeight(cellSize * 0.75);

    for(let x = 0; x < cellCount; x++) {
        for(let y = 0; y < cellCount; y++) {
            if(grid[x][y].visited) {
                const cellColor = color(
                    computeHue(grid[x][y].age), 80, 80,
                    computeAlpha(grid[x][y].z)
                );
                stroke(cellColor);
                point(origin + x * cellSize, origin + y * cellSize);
            }
        }
    }

    // update for next iteration
    state.move();
    console.log(state);
}

function computeHue(cellAge) {
    const colorPeriod = 100 / colorSpeed;
    const huePhase = (cellAge / colorPeriod) % 2;
    const rawHue = huePhase == 0
        ? cellAge % colorPeriod
        : colorPeriod - (cellAge % colorPeriod);
    return rawHue * colorSpeed;
}

function computeAlpha(cellZ) {
    const minGray = 25;
    return minGray + ((cellZ * (255 - minGray))/ 100);
}

class State {
    constructor(size) {
        this.size = size;
        this.grid = [];
        this.path = [];
        this.pos = {x: 0, y: 0, z: 0};
        
        for(let x = 0; x < size; x++) {
            this.grid[x] = [];
            for(let y = 0; y < size; y++) {
                this.grid[x].push({x, y, z: 0, age: 0, visited: false});
            }
        }

        this.applyMove(Math.floor(size / 2), Math.floor(size / 2), 50, 0);
    }

    move() {
        for(let i = this.path.length; i > 0; i--) {
            const current = i == this.path.length
                ? this.pos
                : this.path[i];
            const possiblesMoves = this.getPossibleMoves(current.x, current.y);
            if(possiblesMoves.length > 0) {
                const {x, y} = random(possiblesMoves);
                const z = Math.max(0, Math.min(100, current.z + Math.round(random(-20, 20))));
                this.applyMove(x, y, z, i);
                break;
            }
        }
    }

    applyMove(x, y, z, age) {
        console.log(z);
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
        this.grid[x][y].z = z;
        this.grid[x][y].visited = true;
        this.path.push({...this.pos});
        this.grid[x][y].age = age;
    }

    getPossibleMoves(x, y) {
        const moves = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const lx = x + dx;
                const ly = y + dy;
                
                const didntMove = lx == x && ly == y;
                const invalidLx = lx < 0 || lx >= this.size;
                const invalidLy = ly < 0 || ly >= this.size;
                if (didntMove || invalidLx || invalidLy)
                    continue;

                if(!this.grid[lx][ly].visited) {
                    moves.push({x: lx, y: ly});
                }
            }
        }
        return moves;
    }
}