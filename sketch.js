/* eslint-disable no-undef, no-unused-vars */

let unitsPerStep = 0.1;
let stepsPerFrame = 1;
let resScalePerLoop = 3;
let speedScalePerLoop = 2;
let fadeScale = 0.5;

function float2hilbert(input) {
  // following https://math.stackexchange.com/a/1739118
  let t = input.toString(4);
  let e = [0, 0, 0, 0];
  let x = 0;
  let y = 0;
  // u so texy

  for (let i = 2; i < t.length; i++) {
    let qj = parseInt(t[i], 4);
    let dj = (e[0] + e[3]) % 2;
    let scalar = ((-1) ** e[0] / 2 ** (i - 1)) * Math.sign(qj);
    x += scalar * ((1 - dj) * qj - 1);
    y += scalar * (1 - dj * qj);
    e[qj]++;
  }

  return [x, y];
}

function setup() {
  createCanvas(400, 400);
  // Put setup code here
  background(0);
}

let cur = 0;
let prev = [0, 0];
function draw() {
  colorMode(HSB, 1);

  for (let step = 0; step < stepsPerFrame; step++) {
    stroke(cur, 1, 1);
    cur += unitsPerStep;
    if (cur >= 1) {
      cur = 0;
      unitsPerStep /= resScalePerLoop;
      stepsPerFrame *= speedScalePerLoop;

      blendMode(MULTIPLY);
      fill(fadeScale);
      stroke(0);
      rect(0, 0, width, height);
      blendMode(ADD);
      prev = [0, 0];
    } else {
      let next = float2hilbert(cur);
      line(
        prev[0] * height,
        prev[1] * height,
        next[0] * height,
        next[1] * height
      );
      prev = next;
    }
  }
}

/*function draw() {
  let prev = [0, 0];
  background(0);
  colorMode(HSB, 1);
  let max = mouseY / height;
  for (let cur = 0; cur < max; cur += unitsPerStep) {
    stroke(cur, 1, 1);
    let next = float2hilbert(cur);
    line(
      prev[0] * height,
      prev[1] * height,
      next[0] * height,
      next[1] * height
    );
    prev = next;
    cur += unitsPerStep;
  }
}*/

/*let once = false;
function draw() {
  if (once) return;
  once = true;
  drawHilbert(0, width, 0, height, 3);
}

function drawHilbert(xMin, xMax, yMin, yMax, depth) {}

function _drawHilbert(xMin, xMax, yMin, yMax, depth, rotation) {}
*/
