"use strict"

let searchInput = document.querySelector("#searchInput");

//today variables
let todoyName = document.querySelector("#todoyName");
let todayNum = document.querySelector("#todayNum");
let todaymonth =document.querySelector("#todaymonth");
let countyName = document.querySelector("#countyName");
let todayTemp = document.querySelector("#todayTemp");
let todayIcon = document.querySelector("#todayIcon");
let todaySataus = document.querySelector("#todaySataus");
let todayHumidity = document.querySelector("#todayHumidity");
let todayWind = document.querySelector("#todayWind");
let todaycompass = document.querySelector("#todaycompass");

// next day variables

let nextDayName =document.querySelector("#nextDayName");
let nextDayImg=document.querySelector("#nextDayImg");
let nextDayMaxTemp=document.querySelector("#nextDayMaxTemp");
let nextDayMinTemp=document.querySelector("#nextDayMinTemp");
let nextDayStatus=document.querySelector("#nextDayStatus");


//after next day variables
let afterNextDayName =document.querySelector("#afterNextDayName");
let afterNextDayImg=document.querySelector("#afterNextDayImg");
let afterNextDayMaxTemp=document.querySelector("#afterNextDayMaxTemp");
let afterNextDayMinTemp=document.querySelector("#afterNextDayMinTemp");
let afterNextDayStatus=document.querySelector("#afterNextDayStatus");

searchInput.addEventListener("input",function(){
    getSearch();
})
function getSearch() {
    let currentCity = searchInput.value;
    console.log(currentCity);
    weaherApiFunction(currentCity);
    
}
let allData=[];
async function weaherApiFunction(city) {
    let myResonse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8fa9ed5a12cd4b638cc71719231608&q=${city}&days=3`)
    let allData = await myResonse.json();
    displayCurrentToday(allData);
    displayNextDay(allData);
   
}

//today display
function displayCurrentToday(data){

    let today =new Date();
    todoyName.innerHTML=today.toLocaleString('en-US', {weekday: 'long'})
    todayNum.innerHTML =today.getDate();
    todaymonth.innerHTML =today.toLocaleString('en-US', {month: 'long'},)
    countyName.innerHTML = data.location.name;
    todayTemp.innerHTML =data.current.temp_c ;
    todayIcon.setAttribute("src",data.current.condition.icon);
    todaySataus.innerHTML =data.current.condition.text;
    todayHumidity.innerHTML=data.current.humidity+" %";
    todayWind.innerHTML=data.current.wind_kph + " km/h";
    todaycompass.innerHTML=data.current.wind_dir;
}

//next day display

function displayNextDay(data){
    
    let forecastData =data.forecast.forecastday
    console.log(forecastData);
    for (let i = 0; i < forecastData.length; i++) {
       if (i == 1) {
        nextDayName.innerHTML=new Date(forecastData[i].date).toLocaleString('en-US', {weekday: 'long'})
        nextDayImg.setAttribute("src",forecastData[i].day.condition.icon);
        nextDayMaxTemp.innerHTML=forecastData[i].day.maxtemp_c;
        nextDayMinTemp.innerHTML=forecastData[i].day.mintemp_c +"<sup> o</sup>";
        nextDayStatus.innerHTML=forecastData[i].day.condition.text; 

        afterNextDayName.innerHTML=new Date(forecastData[i+1].date).toLocaleString('en-US', {weekday: 'long'})
        afterNextDayImg.setAttribute("src",forecastData[i+1].day.condition.icon);
        afterNextDayMaxTemp.innerHTML=forecastData[i+1].day.maxtemp_c;
        afterNextDayMinTemp.innerHTML=forecastData[i+1].day.mintemp_c +"<sup> o</sup>";
        afterNextDayStatus.innerHTML=forecastData[i+1].day.condition.text; 
       }
        
    }
    // 
    
}

weaherApiFunction("cairo");

