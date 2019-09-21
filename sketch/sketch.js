
// console.log(`is kito lapo ${userInfo.countryLifeExp}`); // metais, durnas skaicius
// console.log(`${userInfo.weeksAlive}`);

console.log('SKETCH JS');

let weeksAliveX, weeksTotalCountryX, stupid_weeks, pilniStulp, weeks_dec, liekana;

function setup() {
  weeksAliveX = userInfo.weeksAlive;
  weeksTotalCountryX = userInfo.lifeExpectancyWeeks;
  stupid_weeks = weeksTotalCountryX / 40;
  pilniStulp = Math.floor(weeksTotalCountryX / 40);
  weeks_dec = (stupid_weeks - pilniStulp).toFixed(3);
  console.log(stupid_weeks, weeks_dec);
  liekana = Math.floor(40 * weeks_dec);
  console.log(liekana);
  
  background(255);
  let canvasCircles = createCanvas(2000, 800);
  canvasCircles.parent('circle-container'); 
}

let circleWidth = 5;
let gutter = 4;
let xPos = circleWidth * 2 + gutter;
let x = 1;
let y = 1;
let eilSk = 41;
let loopCount = 0;


let buttonDOM = document.getElementById('colorBtn');

function draw() {
  stroke(255, 190, 211);

  // i stulpeliai, j eilutes
  for (let i=1; i <= pilniStulp; i++) {
    for(let j = 1; j<= 40; j++) {
      circle(xPos * i, xPos * j, circleWidth);
      noFill();
    }
  }
  // fill(255, 255, 200);
  for (let i = 1; i<= liekana; i++) {
    circle((pilniStulp + 1) * xPos, xPos * i, circleWidth);
  }
  noLoop();
  strokeWeight(1);
      
  if (loopCount < weeksAliveX) {
    buttonDOM.addEventListener('click', myLoop);
  }
}

  function myLoop() {
    
    setTimeout(() => {
      // fill(255, 190, 211);
      fill(255, 255, 200);
      noStroke();
      circle(xPos * x, xPos * y, circleWidth);
      y++;
      if (y % eilSk == 0) x++;
      if (y % eilSk == 0) y = 1;
      
      loopCount++;
      
      // if (loopCount < userInfo.weeksAlive) myLoop();
      if (loopCount < weeksAliveX) myLoop();
    }, 10);
  }

// if (displayCircles) myLoop();

