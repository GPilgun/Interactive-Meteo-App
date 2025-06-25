//01. Get curent Day, Date and Time
function updateDateTime() {
  const now = new Date();

  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const day = days[now.getDay()];

  const date = now.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const time = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", 
    timeZoneName: "short"  // <-- this adds the time zone (e.g., GMT, PDT)
  });

  document.getElementById("day").textContent = day;
  document.getElementById("date").textContent = date;
  document.getElementById("time").textContent = time;
}

// Initial call
updateDateTime();
// Update every second
setInterval(updateDateTime, 1000);

// 1. Load default city from conf.json
async function chargerConfiguration() {
  const response = await fetch("conf.json");
  if (!response.ok) throw new Error("Erreur de chargement de conf.json");
  return response.json();
}

// === Description to Icon mapping ===
const traductionsFR = {
  "ciel dégagé": "Clair",
  "ensoleillé": "Ensoleillé",
  "peu nuageux": "Partiellement nuageux",
  "partiellement nuageux": "Partiellement nuageux",
  "nuageux": "Nuageux",
  "couvert": "Couvert",
  "petites averses":"Petites averses",
  "légère pluie": "Pluie légère",
  "pluie modérée": "Pluie modérée",
  "forte pluie": "Pluie Forte",
  "orage": "Orage",
  "orage avec pluie": "Averses orageuses",
  "orage avec forte pluie": "Pluie légère avec orage",
  "brume": "Brume",
  "brouillard": "Brouillard",
  "neige légère": "Pluie éparse possible", // reuse icon
  "bruine légère": "Bruine",
  "neige modérée": "Neige modérée",
  "fortes chutes de neige": "Neige forte",
  "neige fondue": "Neige fondue",
  "fumée": "Fumée",
  "averses de pluie": "Averses",
  "averses de neige": "Averses de neige",
  "éclairs avec ciel dégagé": "Orage isolé",
  "grêle": "Grêle"
};

// 2. Get weather data from openweathermap.org

// === Configuration ===
// apiKey for TEST purposes from  https://github.com/abdellatif-laghjaj/weather-web-app/blob/d5ac4d58f68ce93647eb42396039805282d32f23/js/script.js#L13

const apiKey = "b190a0605344cc4f3af08d0dd473dd25"; 
 
 // === Fetch weather from OpenWeatherMap ===
  async function obtenirMeteo(city) {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=fr&appid=${apiKey}`;
  
  const response = await fetch(url);

  if (!response.ok) throw new Error("Erreur de récupération des données météo.");
  
  const data = await response.json();

const rawDescription = data.weather[0].description.toLowerCase(); 
    // This is in French, thanks to lang=fr with lowercase for consistency
const translated = traductionsFR[rawDescription] || rawDescription;

  if (!traductionsFR[rawDescription]) {
    console.warn("Traduction manquante pour :", rawDescription);
  }

  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    wind: (data.wind.speed * 3.6).toFixed(1), // convert from m/s to km/h
    description: translated
  };
}

// 3. Display the weather in the HTML
// icons source from gethub visualcrossing repository
const iconBaseURL = "https://cdn.jsdelivr.net/gh/visualcrossing/WeatherIcons@ea317711649d4c0e6ca34b3dc10cfb225407b12b/SVG/2nd%20Set%20-%20Color";
const iconBase2URL = "https://cdn.jsdelivr.net/gh/visualcrossing/WeatherIcons@6231688b36311be3ed337868e322258c1cb5f2f3/SVG/3rd%20Set%20-%20Color";

const iconMap = {
 "Clair": `${iconBase2URL}/clear-day.svg`,
  "Ensoleillé": `${iconBaseURL}/clear-day.svg`,
  "Peu nuageux": `${iconBaseURL}/partly-cloudy.svg`,
  "Partiellement nuageux": `${iconBase2URL}/partly-cloudy-day.svg`,
  "Nuageux": `${iconBaseURL}/cloudy.svg`,
  "Couvert": `${iconBase2URL}/cloudy.svg`,
  "Pluie légère": `${iconBaseURL}/showers-day.svg`,
  "Petites Averses": `${iconBaseURL}/showers-day.svg`,
  "Averses de pluie": `${iconBase2URL}/showers-day.svg`,
  "Pluie modérée": `${iconBaseURL}/rain.svg`,
  "Pluie Forte": `${iconBase2URL}/rain.svg`,
  "Averses orageuses": `${iconBaseURL}/thunder-rain.svg`,
  "Orage":`${iconBaseURL}/thunder.svg`,
  "Orage isolé":`${iconBaseURL}/thunder.svg`,
  "Pluie légère avec orage": `${iconBaseURL}/thunder-showers-day.svg`,
  "Pluie éparse possible": `${iconBaseURL}/showers-day.svg`,
  "Averses de neige": `${iconBaseURL}/snow-showers-day.svg`,
  "Neige légère":`${iconBaseURL}/snow.svg`,
  "Neige modérée":`${iconBase2URL}/snow.svg`,
  "Neige forte":`${iconBase2URL}/snow.svg`,
  "Neige fondue":`${iconBase2URL}/sleet.svg`,
  "Grêle": `${iconBaseURL}/hail.svg`,
  "Brume": `${iconBase2URL}/fog.svg`,
  "Brouillard": `${iconBase2URL}/fog.svg`,
  "Fumée": `${iconBaseURL}/fog.svg`,
  "Bruine":`${iconBaseURL}/fog.svg`,

  "Par défaut": `${iconBase2URL}/clear-day.svg`
};

// === Display icon ===
function afficherIcone(description) {
  const img = document.getElementById("weatherIcon");
  if (!img) {
    console.error("Image element #weatherIcon not found");
    return;
  }

  console.log("Setting icon for description:", description);

  const iconURL = iconMap[description] || iconMap["Par défaut"];
  console.log("Icon URL:", iconURL);

  img.src = iconURL;
  img.style.display = "inline";
}

 // === Display weather in DOM ===
  function afficherMeteo(city, data) {
  document.getElementById("weatherCity").textContent = city;
  document.getElementById("weatherDesc").textContent = data.description;
  document.getElementById("weatherTemp").textContent = `Température : ${data.temp} °C`;
  document.getElementById("weatherHumidity").textContent = `Humidité : ${data.humidity}%`;
  document.getElementById("weatherWind").textContent = `Vent : ${data.wind} km/h`;
  document.getElementById("weatherTime").textContent = `Mis à jour : ${new Date().toLocaleTimeString()}`;
  
  afficherIcone(data.description);
}

 // 4. Update weather from conf.json (default)
async function miseAJourMeteo() {
  try {
    const config = await chargerConfiguration();
    const data = await obtenirMeteo(config.city);
    afficherMeteo(config.city, data);
  } catch (err) {
    document.getElementById("weather").innerHTML = "Erreur : " + err.message;
    console.error(err);
  }
}

// ✅ 5.  Update weather from user input
async function miseAJourDepuisInput() {
   const input = document.getElementById("cityInput");
  const city = input.value.trim();

  if (city.length < 2) {
    alert("Veuillez entrer un nom de ville valide.");
    return;
  }
   obtenirMeteo(city)
    .then(data => {
      afficherMeteo(city, data);
      input.value = ""; // clear after search
    })
    .catch(err => {
      console.error(err.message);
      alert(err.message);
    });
}

// Initial call and hourly refresh
miseAJourMeteo();                    
setInterval(miseAJourMeteo, 3600000);  // Refresh every hour

//setInterval(miseAJourMeteo, 10000); // for testing: every 10 sec   
