const canvasSize = 750;

function setup() {
    select("body").style("background", "#202122");
    createCanvas(canvasSize, canvasSize);
    noLoop();
}

function draw() {
    background(0);
    const demiSize = canvasSize / 2;
    const maxDist = Math.sqrt(2 * demiSize * demiSize);
    for(let x = 0; x < canvasSize; x++) {
        for(let y = 0; y < canvasSize; y++) {
            const distToCenter = dist(x, y, demiSize, demiSize);
            const noiseStep = map(distToCenter, 0, maxDist, 0.005, 0.04);
            stroke(255 * noise(x * noiseStep, y * noiseStep));
            point(x, y);
        }
    }
}