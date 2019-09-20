
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
let eilSk = 40;
let loopCount = 0;

// function myLoop() {
  
//   setTimeout(() => {
//     circle(xPos * x, xPos * y, circleWidth);
//     fill(255, 190, 211);
//     y++;
//     if (y % eilSk == 0) x++;
//     if (y % eilSk == 0) y = 1;

//     console.log(xPos);
//     loopCount++;
//     if (loopCount < 5000) myLoop();
//   }, 5);
// }

let buttonDOM = document.getElementById('colorBtn');
function draw() {
  // console.log(buttonDOM);
  
  stroke(255, 190, 211);

  for(let i = 1; i <= 32; i++) {
        for (let j = 1; j <= 30; j++) {
            circle(xPos * i, xPos * j, circleWidth);
            noFill();
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
      if (loopCount < 5000) myLoop();
    }, 10);
  }

// if (displayCircles) myLoop();

