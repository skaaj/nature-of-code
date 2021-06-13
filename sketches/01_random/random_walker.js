const width = 500;
const height = 500;
let red;
let blue;
let it = 0;
let colorDir = 1;
let x, y;

function setup() {
    createCanvas(width, height);
    background(0);
    stroke(200, 25);
    strokeWeight(10);
    x = width / 2;
    y = height / 2;
    red = color('rgba(200, 0, 0, 0.5)');
    blue = color('rgba(0, 0, 200, 0.5)');
}

function draw() {
    const dx = random(-5, 5);
    const dy = random(-5, 5);

    x += dx;
    y += dy;

    let current_color = lerpColor(red, blue, it / 1000);

    stroke(current_color);

    point(
        x >= 0 ? x % width : width - x,
        y >= 0 ? y % height : height - y
    );

    it += colorDir;

    if(it <= 0 || it >= 1000) {
        colorDir *= -1;
    }
}