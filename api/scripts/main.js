let requestLocation = new XMLHttpRequest();
    
let data;
let country;
requestLocation.open('GET', 'http://ip-api.com/json/', true)

requestLocation.onload = function() {
    data = JSON.parse(this.response)
    console.log(requestLocation
        .status);
    if (requestLocation
        .status >= 200 && requestLocation
.status < 400) {
        country = data.countryCode;
        console.log(country);
    } else {
        console.log('error');
    }
}
requestLocation.send();

// document.onload = function() {
//     console.log(country);
// }
var requestCountry = new XMLHttpRequest;
var countriesArr = [];
requestCountry.open('GET', './scripts/data.json', true);

requestCountry.onload = function() {
    countries = JSON.parse(this.response);
    console.log(requestCountry.status)
    if(requestCountry.status >= 200 && requestCountry.status < 400) {
        // countries.push(countries.name);
        for (let i = 0; i < countries.data.length; i++) {
            countriesArr.push(countries.data[i].name);
        }
        consoleCountries();
    } else {
        console.log('err')
    }
}
requestCountry.send()

function consoleCountries() {
    countriesArr.sort().splice(0,2);
    console.log(countriesArr);

    $(window).ready(() => {
            $("input").autocomplete({
            source: countriesArr,
            minLength: 0,
            position: { my : "left bottom", at: "left top-40px" }
        }).focus(function () {
            $(this).autocomplete("search");
        });
    });

}




// loadURL("./scripts/data.json", onDataLoaded);

// function onDataLoaded(data) {
//   data = JSON.parse(data);
//   console.log(data);
// }
// function loadURL(url, callBack) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.setRequestHeader("Accept", "application/json");
//     xhr.onloadend = onLoadEnd(xhr, callBack);
//     xhr.send();
//   }
  
//   function onLoadEnd(request, callBack) {
//     return function() {
//       var status = request.status;
//       var result = String(request.response);
//       if (status >= 200 && status < 300) callBack(result);
//     };
//   }


