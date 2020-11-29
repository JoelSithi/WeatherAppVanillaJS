const api = {
  key: 'cff74a4297b3fd18bdceb7814958bd55',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
  if(evt.keyCode == 13) { // 13 est le keycode de la touche Entrée
    getResults(searchbox.value);
    console.log(searchbox.value); // pour voir si on récupère bien ce qu'on écrit dans l'input
  }
}

function getResults(query){
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather=> {
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather){
  console.log(weather);
  
  let city = document.querySelector('.city');
  city.innerText = `${weather.name}, ${weather.sys.country}`; // change et affiche le nom de la ville tapé
  
  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.weather');
  weather_el.innerText = `${weather.weather[0].main}`; // ou weather.weather[0].main

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d){
  let months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août', 'Septembre', 'Octobre','Novembre', 'Décembre'];
  let days = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}