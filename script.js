
let date = {
    months : ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
}

let selectionDOM = document.getElementsByClassName('date-picker__selection')[0];
let datePickerDOM = document.getElementsByClassName('date-picker__headline-container')[0];
let datePickerInfoDOM = document.getElementsByClassName('date-picker-info')[0];
let datePickerConteinerDOM = document.getElementsByClassName('date-picker')[0];

let daysAdded = false;
datePickerInfoDOM.style.display = 'none';

let blocks = ['birthday', 'location', 'user-info'];

let arrowDOM = document.getElementsByClassName('arrow-container')[0];

function initialDisplayNone() {
    for (let i = 0; i < blocks.length; i++) {
        document.getElementsByClassName(blocks[i])[0].style.display = 'none';
    }
    arrowDOM.style.display = 'none';
    toggleArrowClass(currentBlock = false, block = false);
}
initialDisplayNone();

displayBlock('birthday');

function displayBlock(block) {
    document.getElementsByClassName(block)[0].style.display = 'inline-block';
    if (typeof window.innerWidth != 'undefined')
    {
        if (window.innerWidth <= 1000 && block !== 'user-info') {
            document.getElementsByClassName(block)[0].style.display = 'flex';
        }    
        if (window.innerWidth <= 1000 && block === 'user-info') {
            document.getElementsByClassName(block)[0].style.display = 'block';
        }    
    }
}

function hideBlock(block) {
    document.getElementsByClassName(block)[0].style.display = 'none';
    arrowDOM.style.display = 'none';
}

datePickerDOM.addEventListener('mouseover', () => {
    if (daysAdded == false) {
    selectionDOM.classList.add('transitionHeight');
    if (typeof window.innerWidth != 'undefined')
    {
        if (window.innerWidth <= 1000) {
            datePickerConteinerDOM.classList.add('transitionDown');
        } else {
            datePickerConteinerDOM.classList.add('transitionTop');
        } 
    }
     setTimeout(() => {
                datePickerInfoDOM.style.display = 'block';
                displayDays();
            }, 300)
        }
});

function addZero(i) {
    if (i < 10) return `0${i}`
    else return `${i}`;
}

let userInfo = {
    day: 'DD',
    month: 'MM',
    year: 'YYYY',
    location: '',
    daysAlive: '',
    weeksAlive: '',
    lifeExpectancyYears: '',
    lifeExpectancyWeeks: '',
    calcWeeks : function() {
        let d0 = new Date(`${this.year}-${this.month}-${this.day}`);
        let d1 = new Date;
        // 8.64e7 is a number of milliseconds in a day
        this.daysAlive = Math.floor((d1 - d0) / 8.64e7);
        this.weeksAlive = Math.floor(this.daysAlive / 7);
    },
    fetchTotal: async function () {
        console.log('async funcija eina');
        const res = await fetch('./data.json');
        const countries = await res.json();
        let findCountry = await countries.data.find(el => el.name === this.location);
        this.lifeExpectancyYears = await findCountry.total;
        document.getElementById('expectancy-years').innerHTML = await findCountry.total;
        this.yearsToWeeks();
    },
    yearsToWeeks: function() {
        num = (this.lifeExpectancyYears + "").split(".");
        let years_int = num[0];
        let years_dec = num[1];
        let toDays = (years_dec/1000) * 365.2425;
        let toWeeks = toDays / 7;
        this.lifeExpectancyWeeks = Math.round(toWeeks + years_int * 52.178);
        document.getElementById('expectancy-weeks').innerHTML = this.lifeExpectancyWeeks;
        checkIfOutlived();
    }
}

function displayDays() {
    datePickerHeadline(dd = true);
    if (daysAdded === false) {

        for (let i = 1; i <= 31; i++) {
            document.getElementsByClassName('selection-container')[0].innerHTML += `<div class="day">${addZero(i)}</div>`;
        }
        daysAdded = true;
    }
    updateUserDay();
}

function updateUserDay() {
    
    for (let i = 1; i <= 31; i++) {
        document.getElementsByClassName('day')[i-1].addEventListener('click', () => {
            userInfo.day = addZero(i);
            datePickerHeadline();
            displayMonth();
        })
    }
}

function displayMonth() {
    datePickerHeadline(dd = false, mm = true);
    document.getElementsByClassName('selection-container')[0].innerHTML = `<p class="date-picker-info">Select a month</p>`;
    for(let i = 0; i < date.months.length; i++) {
        document.getElementsByClassName('selection-container')[0].innerHTML += `<div class="month">${date.months[i]}</div>`;
    }
    
    updateUserMonth();
}

function updateUserMonth() {
    for(let i = 0; i < date.months.length; i++) {
        document.getElementsByClassName('month')[i].addEventListener('click', () => {
            userInfo.month = addZero(i+1);
            datePickerHeadline();
            displayYears();
        });
    }
}

function displayYears() {
    datePickerHeadline(dd = false, mm = false, yyyy = true);
    document.getElementsByClassName('selection-container')[0].innerHTML = `<p class="date-picker-info">Select a year</p>`;
    
    let today = new Date();
    let currentYear = today.getFullYear();
    
    for (let i = 0; i <= 100; i++) {
        document.getElementsByClassName('selection-container')[0].innerHTML += `<div class="year">${currentYear-i}</div>`;
    }

    document.getElementsByClassName('selection-container')[0].style.overflowY = 'auto';
    document.getElementsByClassName('selection-container')[0].style.alignContent = 'initial';

    updateUserYear(currentYear);
}
let yearAdded = false;

function updateUserYear(currentYear) {
    for (let i = 0; i < 100; i++) {
        document.getElementsByClassName('year')[i].addEventListener('click', () => {
            userInfo.year = currentYear-i;
            datePickerHeadline();
            yearAdded = true;
            birthdayComfirmation();
        });
    }
}

function datePickerHeadline(dd = false, mm = false, yyyy = false) {
    if (dd) {
        document.getElementsByClassName('date-picker__headline')[0].innerHTML = `<b>${userInfo.day}</b>/${userInfo.month}/${userInfo.year}`;
    } else if (mm) {
        document.getElementsByClassName('date-picker__headline')[0].innerHTML = `${userInfo.day}/<b>${userInfo.month}</b>/${userInfo.year}`;
    } else if (yyyy) {
        document.getElementsByClassName('date-picker__headline')[0].innerHTML = `${userInfo.day}/${userInfo.month}/<b>${userInfo.year}</b>`;
    } else {
        document.getElementsByClassName('date-picker__headline')[0].innerHTML = `${userInfo.day}/${userInfo.month}/${userInfo.year}`;
    }
}

function birthdayComfirmation() {
    datePickerConteinerDOM.classList.add('transitionBack');
    document.getElementsByClassName('date-picker__selection')[0].style.opacity = '0';
    setTimeout(() => {
        document.getElementsByClassName('date-picker__selection')[0].style.display = 'none';
           }, 300);
    userInfo.calcWeeks();
    arrowAnimation('birthday','location');
}

function arrowAnimation(currentBlock, nextBlock) {
    if (window.innerWidth <= 1000) {
        arrowDOM.style.display = 'block';
    } else {
        arrowDOM.style.display = 'inline-block';
    } 
    arrowDOM.addEventListener('click', () => {
        toggleArrowClass(currentBlock, nextBlock);
        hideBlock(currentBlock);
        displayBlock(nextBlock);
        if (nextBlock === 'user-info') {
            updateUserInfoDOM();
        }
    })

    if (nextBlock === 'location') alternativeLocationQuestion();
}
var loadJS = function(url, location){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    location.appendChild(scriptTag);
};

function toggleArrowClass(currentBlock, nextBlock) {
    console.log(currentBlock, nextBlock);
    if (currentBlock) arrowDOM.classList.remove(`${currentBlock}-arrow`);
    if (nextBlock === false) nextBlock = 'birthday';
    arrowDOM.classList.add(`${nextBlock}-arrow`);
}

function alternativeLocationQuestion() {
    document.getElementsByClassName('location__question-questionmark')[0].style.display = 'none';
    document.getElementsByClassName('location__question')[0].innerHTML = 'You are from:'
}

// DETECT COUNTRY

var requestLocation = new XMLHttpRequest();
    
var locationData;
var userLocationCode;
let userLocation;
requestLocation.open('GET', 'http://ip-api.com/json/', true)

requestLocation.onload = function() {
    locationData = JSON.parse(this.response)
    if (requestLocation.status >= 200 && requestLocation.status < 400) {
        userLocationCode = locationData.countryCode;
        countryCodeToName(userLocationCode);
    } else {
        console.log('error');
    }
}
requestLocation.send();


let locationPlaceholder = document.getElementsByName('country')[0];
function displayUsersLocation(name) {
    locationPlaceholder.placeholder = name;
}

async function countryCodeToName(countryCode) {
    console.log(`location detection: ${userLocationCode}`);
    const res = await fetch('https://restcountries.eu/rest/v2/alpha/'+countryCode);
    const data = await res.json();
    displayUsersLocation(data.name);
}

// COUNTRIES

let listCountries;
let lowerCaseCountries = [];
var requestCountry = new XMLHttpRequest;
var countriesArr = [];

requestCountry.open('GET', './data.json', true);

requestCountry.onload = function() {
    countries = JSON.parse(this.response);
    if(requestCountry.status >= 200 && requestCountry.status < 400) {
        // countries.push(countries.name);
        for (let i = 0; i < countries.data.length; i++) {
            countriesArr.push(countries.data[i].name);
        }
        consoleCountries();
        console.log(countries.data[3].total);
        countriesArr.sort().splice(0,2);
        
        countriesArr.forEach((el) => {
            lowerCaseCountries.push(el.toLowerCase());
        });

 
    } else {
        console.log('err')
    }
}
requestCountry.send();

let locationPickerHeadline = document.getElementsByClassName('location__picker__headline-container')[0];
let locationSelectionDOM = document.getElementsByClassName('location__picker__selection')[0];
let locationSelection = document.getElementsByClassName('location__picker')[0];
let locationSelectionContainer = document.getElementsByClassName('location__picker')[0];

function consoleCountries() {
    $(window).ready(() => {
        $("input").autocomplete({
            // source: countriesArr,
            source: function(req, responseFn) {
                let re = $.ui.autocomplete.escapeRegex(req.term);
                let matcher = new RegExp( "^" + re, "i" );
                let a = $.grep( countriesArr, function(item,index){
                    return matcher.test(item);
                });
                responseFn( a );
            },
            select: function(event, ui) {
                userInfo.location = ui.item.label;
                arrowAnimation('location', 'user-info');
                // addAnimationScripts();
            },
            minLength: 0,
            position: { my : "left top", at: "left bottom+5px" }
        }).focus(function () {
            $(this).autocomplete("search");
        });
    });
    

let arrowLocationDOM = document.getElementsByClassName('arrow-location')[0];
let locationInputVal = document.getElementById('list-container');
let locationIndex;

// detects change on input element
$('input').each(function() {
    var elem = $(this);
    // Save current value of element
    elem.data('oldVal', elem.val());
 
    // Look for changes in the value
    elem.bind("propertychange change click keyup input paste", function(event){
        // If value has changed...
        if (elem.data('oldVal') != elem.val()) {
            // Updated stored value
            elem.data('oldVal', elem.val());
            
            arrowDOM.style.display = 'none';
            
            let el;
            if (checkIfValid(this.value)) {
                validElement = this.value;
                let locationVal = this.value;
                let locationCap = locationVal.charAt(0).toUpperCase() + locationVal.slice(1); 
                el = locationCap;
            } else if (this.value === '' && checkIfValid(locationPlaceholder.placeholder)) {
                el = locationPlaceholder.placeholder;
            }
            if (el !== '') {
                userInfo.location = el;
                arrowAnimation('location', 'user-info');
            } else {
                console.log('please type in a correct country name');
            }
}});
});

function checkIfValid(val) {
    let validElement = false;
    // checks if val is ether in countriesArroror lowerCaseCountries;
    countriesArr.forEach((el) => {
        if (val === el) {
            validElement = true;
        }
    });
    lowerCaseCountries.forEach((el) => {
        if (val === el) {
            validElement = true;
        }
    });
    return validElement;
}

let checkPlaceholder = setInterval(() => {

    let el = document.getElementsByClassName('arrow-container')[0];
    if (el.classList.contains('location-arrow')) {
        let valid = checkIfValid(locationPlaceholder.placeholder);
        if (valid) { 
            userInfo.location = locationPlaceholder.placeholder;
            arrowAnimation('location', 'user-info');
            clearInterval(checkPlaceholder);
        }
    }
}, 200);

listCountries = document.getElementsByClassName('ui-menu-item');

for (let i = 0; i < listCountries.length; i++) {
    console.log(listCountries[i].innerText);
    listCountries[i].addEventListener('click', () => {
        console.log(listCountries[i].innerText);
    });
}
}

let countriesNotAdded = true;
let dataListOption = document.getElementById('countryName');
function addCountries() {
    if (countriesNotAdded) {
        setTimeout(() => {
            for(let i = 0; i < countriesArr.length; i++) {
                dataListOption.innerHTML += `<option value="${countriesArr[i]}">`;
            }
            countriesNotAdded = false;
        }, 0);
    }
}

// USER INFO
let userInfoDOMUpdated = false;
function updateUserInfoDOM() {
    userInfo.fetchTotal();
    console.log('updateUserInfoDOM')
    document.getElementById('country').innerHTML = userInfo.location;
    document.getElementById('country2').innerHTML = userInfo.location;
    document.getElementById('country3').innerHTML = userInfo.location;
    document.getElementById('birthday').innerHTML = `${userInfo.day}/${userInfo.month}/${userInfo.year}`;
    document.getElementById('weeks-alive').innerHTML = userInfo.weeksAlive;
    userInfoDOMUpdated = true;
}

function checkIfOutlived() {
    let outlivedDOM = document.getElementsByClassName('outlived-message')[0];
    if (userInfo.weeksAlive > userInfo.lifeExpectancyWeeks ) {
        outlivedDOM.style.display = 'block';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    let outlivedClose = document.getElementsByClassName('fa-times-circle')[0];
    outlivedClose.addEventListener('click', () => {
        outlivedDOM.style.display = 'none';
    });
}
let yearsToWeeks = function(num) {
    num = (num + "").split(".");
    return num[0];
}

let DOMInterval = setInterval(() => {
    if (userInfoDOMUpdated) {
        addAnimationScripts();
        clearInterval(DOMInterval);
    }
}, 100);

function addAnimationScripts() {
    console.log('scriptai pridedami')
    setTimeout(() => {
        console.log('scriptai prideti')
        loadJS('sketch/libraries/p5.min.js', document.body);
        loadJS('sketch/sketch.js', document.body);
    }, 10);
}
