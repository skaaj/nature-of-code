// global vars
const canvasSize = 500;

function setup() {
    // dom
    select("body").style("background", "#202122");
    // canvas
    createCanvas(canvasSize, canvasSize);
    colorMode(HSB, 100);
    background(0);
    //frameRate(30);
}

function draw() {
    for(let i = 0; i < 50; i++) {
        drawPoint(i / 10);
    }
}

function drawPoint(size) {
    const center = canvasSize / 2;
    const deviation = canvasSize / 8;
    const randX = clamp(randomGaussian(center, deviation), 0, canvasSize);
    const randY = clamp(randomGaussian(center, deviation), 0, canvasSize);
    const hue = 100 * norm(dist(center, center, randX, randY), 0, center);
    stroke(color(hue, 80, 80, 50));
    strokeWeight(size);
    point(randX, randY);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
