let weeksAliveX, weeksTotalCountryX, stupid_weeks, pilniStulp, weeks_dec, liekana, canvasWidth;

let circleWidth = 4;
let gutter = 4;
let xPos = circleWidth * 2 + gutter;
let x = 1;
let y = 1;
let totalInLine;
let loopCount = 0;
let stulp;
let vertical = false;
let mdStulp;

if (typeof window.innerWidth != 'undefined') { 
  if (window.innerWidth <= 1000) {
    vertical = true;
    let userWidth = window.innerWidth * 0.85;
    mdStulp = Math.ceil((userWidth - (circleWidth*2 + gutter)) / (circleWidth*2 + gutter)); 
  } 
}

let stulpeliai;
let eilutes;

function setup() {
  
  weeksAliveX = userInfo.weeksAlive;
  weeksTotalCountryX = userInfo.lifeExpectancyWeeks;
  
  
  if (window.innerWidth > 1000) {
    eilutes = 40;
    totalInLine = eilutes + 1;
    pilniStulp = Math.floor(weeksTotalCountryX / eilutes);
    stulpeliai = pilniStulp;
  } else if (window.innerWidth <= 1000) {
    stulpeliai = mdStulp;
    totalInLine = stulpeliai + 1;
    pilnosEilVertical = Math.floor(weeksTotalCountryX / mdStulp);
    eilutes = Math.floor(weeksTotalCountryX / stulpeliai);
  }
  
  // naudojami paziureti ar vartotojo amzius ne didesnis, nei avg
  // naudojama nustatant canvasArg
  weeksAliveWidth = Math.floor(userInfo.weeksAlive / eilutes);
  
  // paskutines eil.skaiciavimas

    stupid_weeks = weeksTotalCountryX / eilutes;
    weeks_dec = (stupid_weeks - pilniStulp).toFixed(3);
    liekana = Math.floor(eilutes * weeks_dec);

  if (window.innerWidth <= 1000) {
    stupid_weeks = weeksTotalCountryX / eilutes;
    weeks_dec = (stupid_weeks - stulpeliai).toFixed(3);
    liekana = Math.floor(stulpeliai * weeks_dec);
  }

  verticalPilnosEil = Math.floor(weeksTotalCountryX / mdStulp);
  let verticalHeight = Math.floor(userInfo.weeksAlive / mdStulp);

  let canvasArg;
  if (weeksTotalCountryX > userInfo.weeksAlive) canvasArg = pilniStulp; 
  if (userInfo.weeksAlive > weeksTotalCountryX) canvasArg = weeksAliveWidth; 
  canvasHeight = 40 * (circleWidth*2 + gutter) + circleWidth*2 + gutter;
  
  if (vertical) {
    canvasArg = mdStulp;
    canvasHeight = eilutes * (circleWidth*2 + gutter) + circleWidth*4 + gutter ;
  };
  canvasWidth = canvasArg * (circleWidth*2 + gutter) + circleWidth*4 + gutter*2;

  
  let canvasCircles = createCanvas(canvasWidth, canvasHeight);
  // background(255, 255, 255);
  canvasCircles.parent('circle-container'); 
}



let buttonDOM = document.getElementById('colorBtn');


function draw() {
  for (let i=1; i <= stulpeliai; i++) {
    for(let j = 1; j<= eilutes; j++) {
      noFill();
      stroke(253,114,115);
      circle(xPos * i, xPos * j, circleWidth);
    }
  }
  if (window.innerWidth > 1000) {
    for (let i = 1; i<= liekana; i++) {
      circle((stulpeliai + 1) * xPos, xPos * i, circleWidth);
    }
  } else if (window.innerWidth <= 1000) {
    for (let i = 1; i<= liekana; i++) {
      circle(i * xPos, (eilutes + 1) * xPos, circleWidth);
    }
  }
  fill(100, 100, 100);
  noLoop();
  strokeWeight(1);
      
  if (loopCount < weeksAliveX) {
    buttonDOM.addEventListener('click', () => {
      myLoop();
    });
  }
}

  function myLoop() {
    
    setTimeout(() => {
      fill(253,114,115);
      noStroke();

      circle(xPos * x, xPos * y, circleWidth);
      if (window.innerWidth > 1000) {
        y++;
        if (y % totalInLine == 0) x++;
        if (y % totalInLine == 0) y = 1;
      } 
      if (window.innerWidth <= 1000) {
        x++;
        if (x % totalInLine == 0) y++;
        if (x % totalInLine == 0) x = 1;
      }
      loopCount++;
      
      if (loopCount < weeksAliveX) myLoop();
    }, 10);
  }


