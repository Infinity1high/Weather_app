$(document).ready(function(){
  
var url='http://api.openweathermap.org/data/2.5/weather?';
var appid = "&APPID=061f24cf3cde2f60644a8240302983f2";
var units = '&units=metric'
var api='text';
//get time from the browser
var currentTime = new Date();
date=currentTime.getDate();
month=currentTime.getMonth();
hours = currentTime.getHours();
minutes = currentTime.getMinutes();
if (minutes.toString().length===1) {
  minutes1='0'+ minutes;
}
else {
  minutes1=minutes;
}
$('#time').html(' '+ hours +':' + minutes1);
//end of browser time

//get location from browser to build api link   
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
 lat=position.coords.latitude;
 lon=position.coords.longitude;
 api=url+"lat="+lat +"&lon=" +lon + appid + units;    

  
var getData = function(data){
var city=data.name + ', ' + data.sys.country;
temp=Math.round(data.main.temp);
var condition=data.weather[0].main.toUpperCase();
var wind=data.wind.speed;
var humidity=data.main.humidity;
var cloudiness=data.clouds.all;

  $("#city").html(city);
  $("#temperature").html(' ' + temp + ' ');
  $("#condition").html(condition + ' ');
  $("#wind").html(wind +' M/S');
  $('#humidity').html('Humidity ' + humidity + ' %');
  $('#cloudiness').html(' ' + cloudiness +' %');
 

//change weather icons
switch (condition) {
  case 'RAIN':
   $('.rainy').removeClass('hidden');
  break;
  case 'CLOUDS':
  $('.cloudy').removeClass('hidden');
  
  break;
  case 'CLEAR':
     if ((5<hours)&&(hours<21)){
       $('.sunny').removeClass('hidden');
       break;
     }
     else {
       $('.night').removeClass('hidden');
       break;
     }
  case 'SNOW':
  $('.flurries').removeClass('hidden');
  break;
 } 
 //end of icon change
 
/**
   if (condition ==='RAIN') {
$('#condition #icon i').addClass('wi wi-rain');
}
else if (condition ==="CLOUDS"){
  $('#condition #icon i').addClass('wi wi-cloudy');
}
else if (condition ==="CLEAR" &&((0<hours<6)||(hours>20))){
  $('#condition #icon i').addClass('wi wi-night-clear');
}
else if (condition ==="CLEAR" && (5<hours<21)){
  $('#condition #icon i').addClass('wi wi-day-sunny');
}
else if (condition === 'SNOW'){
  $('#condition #icon i').addClass('wi wi-snowflake-cold');
}
*/
};
 //end of function

  $.getJSON(api, getData);

 });
 }

//switch units
$('#imperial').click(function(){
$('#metric').removeClass('selected');
$('#imperial').addClass('selected');
$('#temperature').html(Math.round(temp * 9 / 5 + 32));
});
$('#metric').click(function(){
units='&units=metric';
$('#imperial').removeClass('selected');
$('#metric').addClass('selected');
$('#temperature').html(temp);
});
$('#url').html(api);   
     
 });
