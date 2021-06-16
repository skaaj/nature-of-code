const width = 500;
const height = 500;
const barHeight = 50;
const totalHeight = height + barHeight;
let walkers = [];

function setup() {
    walkers = [
        new Walker({
            x: width / 3, y: 2 * height / 3,
            speed: 10,
            color: color('red')
        }),
        new Walker({
            x: width / 2, y: height / 3,
            speed: 10,
            color: color('green')
        }),
        new Walker({
            x: 2 * width / 3, y: 2 * height / 3,
            speed: 10,
            color: color('blue')
        })
    ];
    // dom
    select("body").style("background", "#202122");
    // canvas
    createCanvas(width, height + barHeight);
    frameRate(75);
    background(0);
    strokeWeight(50);
}

function draw() {
    walkers.forEach(w => {
        w.move();
        w.draw();
    });

    if(frameCount % 10 == 0) {
        const fps = frameRate();
        strokeWeight(0);
        fill(0);
        rect(0, height, width, barHeight);
        fill(255);
        text("FPS: " + fps.toFixed(0), 10, totalHeight - 10);
        text("Framecount: " + frameCount, 10, totalHeight - 30);
    }
}

class Walker {
    constructor({x, y, speed, color}) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.color.setAlpha(255 * 0.01);
    }

    draw() {
        strokeWeight(50);
        stroke(this.color);
        point(this.x, this.y);
    }

    move() {
        const dx = random(-1, 1);
        const dy = random(-1, 1);
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        // Handle horizontal bounds
        if(this.x > width)
            this.x -= width;
        else if(this.x < 0)
            this.x += width;
        // And then vertical ones
        if(this.y > height)
            this.y -= height;
        else if(this.y < 0)
            this.y += height;
    }
}