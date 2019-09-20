
// console.log(`is kito lapo ${userInfo.countryLifeExp}`); // metais, durnas skaicius
// console.log(`${userInfo.weeksAlive}`);

let circleWidth = 5;
let gutter = 3;
let xPos = circleWidth * 2 + gutter;

function setup() {
  background(255);
  let canvasCircles = createCanvas(2000, 800);
  canvasCircles.parent('circle-container'); 
}

let x = 1;
let y = 1;
let eilSk = 41;
let loopCount = 0;


let buttonDOM = document.getElementById('colorBtn');

function draw() {
  stroke(255, 190, 211);

  // i stulpeliai, j eilutes
  for(let i = 1; i <= 125; i++) {
        for (let j = 1; j <= 40; j++) {
            circle(xPos * i, xPos * j, circleWidth);
            noFill();
            // console.log(xPos * i);
            }
          }
          noLoop();
          strokeWeight(1);
      
      buttonDOM.addEventListener('click', myLoop);
    }
    
  function myLoop() {
    
    setTimeout(() => {
      fill(255, 190, 211);
      noStroke();
      circle(xPos * x, xPos * y, circleWidth);
      y++;
      if (y % eilSk == 0) x++;
      if (y % eilSk == 0) y = 1;
      
      loopCount++;
      
      // if (loopCount < userInfo.weeksAlive) myLoop();
      if (loopCount < 1211) myLoop();
    }, 10);
  }

// if (displayCircles) myLoop();

