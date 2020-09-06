const loca = document.getElementById('location');
const img = document.getElementById('img');
const desc = document.getElementById('desc');
const temperature = document.getElementById('temp')
const form = document.getElementById('search');
const btn = document.getElementById('btn');
const day = document.getElementById('date');
const wi = document.getElementById('wind');
const hum = document.getElementById('hum');
const cld = document.getElementById('cld');
const we = document.getElementById('we');


const api = {
  baseQueryUrl: 'https://api.openweathermap.org/data/2.5/weather?q=',
  id: '3de344cd2121834b9d60851dd2a472ad',
  metricUnit: 'units=metric'
}

function apiCall(queryValue) {
  fetch(`${api.baseQueryUrl}${queryValue}&appid=${api.id}&${api.metricUnit}`)
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('weather', encodeURIComponent(JSON.stringify(data)));
    displayWeatherContent(data);
  })
  .catch(err => console.log(err))
};

window.addEventListener('load', apiCall('lagos'));

function search() {
  apiCall(form.value);
  
}

function keyPress(e) {
  
  if(e.keyCode == 13) {
    e.preventDefault();
    apiCall(form.value);
  }
  
}

btn.addEventListener('click', search);
form.addEventListener('keypress', keyPress);


function displayWeatherContent(weatherResult) {
  const country = weatherResult.sys.country;
  const city = weatherResult.name;
  const icon = weatherResult.weather[0].icon
  const description = weatherResult.weather[0].description;
  const temp = weatherResult.main.temp;
  const wind = weatherResult.wind.speed;
  const humidity = weatherResult.main.humidity;
  const cloud = weatherResult.clouds.all;
  const weather = weatherResult.weather[0].main;
    

  loca.innerText = `${city}, ${country}`;
  img.src = `https://openweathermap.org/img/w/${icon}.png`;
  desc.innerText = description;
  temperature.innerText = `${Math.round(temp)}°c`;
  day.innerText = date();
  wi.innerText = `${wind}/sec `;
  hum.innerText = `${humidity}%`;
  cld.innerText = `${cloud}%`;
  we.innerText = `${weather}`;

  function date(D, d, m, y){
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    D = days[date.getDay()];
    d = date.getDate();
    m = months[date.getMonth()];
    y = date.getFullYear();

    return `${D}, ${d}th ${m} ${y}`;
  }

};


if('serviceWorker' in navigator){
  window.addEventListener('load', () =>{
      navigator.serviceWorker
      .register('./sw.js')
      .then(reg => console.log())

      .catch(err => console.log(`Service worker: Error: ${err}`))
  })
};
