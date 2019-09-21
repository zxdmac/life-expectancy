
// console.log(`is kito lapo ${userInfo.countryLifeExp}`); // metais, durnas skaicius
// console.log(`${userInfo.weeksAlive}`);

let weeksAlive = 384;
let weeksTotalCountry = 3910;
let stupid_weeks = weeksTotalCountry / 40;
let pilniStulp = Math.floor(weeksTotalCountry / 40);
let weeks_dec = (stupid_weeks - pilniStulp).toFixed(3);
console.log(stupid_weeks, weeks_dec);
let liekana = Math.floor(40 * weeks_dec);
console.log(liekana);

// let weeksAlive = 384;
// let weeksTotalCountry = 2003;
// console.log(weeksTotalCountry / 40);
// let pilniStulp = Math.floor(weeksTotalCountry / 40);
// console.log(pilniStulp);
// let numm = ((weeksTotalCountry / 40) + "").split(".");
// let liekana = Math.floor(40 * (numm[1]/100));
// console.log(liekana);

let circleWidth = 5;
let gutter = 5;
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
  // stroke(255, 190, 211);
  // stroke(255, 255, 200);

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
      
      buttonDOM.addEventListener('click', myLoop);
    }
// function draw() {
//   stroke(255, 190, 211);

//   // i stulpeliai, j eilutes
//   for(let i = 1; i <= 125; i++) {
//         for (let j = 1; j <= 40; j++) {
//             circle(xPos * i, xPos * j, circleWidth);
//             noFill();
//             // console.log(xPos * i);
//             }
//           }
//           noLoop();
//           strokeWeight(1);
      
//       buttonDOM.addEventListener('click', myLoop);
//     }


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
      if (loopCount < weeksAlive) myLoop();
    }, 10);
  }

// if (displayCircles) myLoop();

