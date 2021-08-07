const width = 500;
const height = 500;
let walkers = [];

function setup() {
    walkers = [
        new Walker({
            x: width / 2, y: height / 2, z: 0,
            speed: 10,
            color: color('white')
        })
    ];
    // dom
    select("body").style("background", "#202122");
    // canvas
    createCanvas(width, height);
    background(0);
    frameRate(60);
    //noLoop();
}

function keyPressed() {
    redraw();
}

function draw() {
    walkers.forEach(w => {
        w.move();
        w.draw();
    });

    if (frameCount % 10 == 0) {
        strokeWeight(0);
        fill(0);
    }
}

class Walker {
    constructor({ x, y, z, speed, color }) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = speed;
        this.color = color;
        this.mem = [];
    }

    draw() {
        this.color.setAlpha(255 * (0.5 + (this.z / 200)));
        strokeWeight(this.speed / 2);
        stroke(this.color);
        point(this.x, this.y);
    }

    move() {
        let possiblesMoves = this.getPossibleMoves(this.x, this.y, this.speed);
        console.log(possiblesMoves.length);
        if (possiblesMoves.length > 0) {
            const {dx, dy} = random(possiblesMoves);
            this.x += Math.round(dx * this.speed);
            this.y += Math.round(dy * this.speed);
            this.z += Math.round(random(-1, 1) * this.speed);

            // Handle x bounds
            if (this.x > width)
                this.x -= width;
            else if (this.x < 0)
                this.x += width;
            // Then y
            if (this.y > height)
                this.y -= height;
            else if (this.y < 0)
                this.y += height;
            // And finally z ones (clamping [-100, 100])
            if (this.z < -100)
                this.z = -100;
            else if (this > 100)
                this.z = 100;
            
            this.mem.push({x: this.x, y: this.y});
        } else {
            for(let i = this.mem.length - 1; i >= 0; i--) {
                console.log("stucked, going backward");
                const prev = this.mem[i];
                possiblesMoves = this.getPossibleMoves(prev.x, prev.y, this.speed);
                if(possiblesMoves.length > 0) {
                    const {dx, dy} = random(possiblesMoves);
                    this.x += Math.round(dx * this.speed);
                    this.y += Math.round(dy * this.speed);
                    this.z += Math.round(random(-1, 1) * this.speed);
                    this.mem.push({x: this.x, y: this.y});
                    break;
                }
            }
        }
        console.log({x: this.x, y: this.y, z: this.z});
    }

    getPossibleMoves(x, y, speed) {
        const moves = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx == 0 && dy == 0) continue;
                if (!this.isVisited(x + dx * speed, y + dy * speed)) {
                    moves.push({ dx, dy });
                }
            }
        }
        return moves;
    }

    isVisited(x, y) {
        const radius = this.speed / 2;
        return this.mem.some(pos =>
            Math.abs(pos.x - x) < radius &&
            Math.abs(pos.y - y) < radius
        );
    }
}