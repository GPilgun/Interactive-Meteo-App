const traductionsFR = {
  "Sunny": "Ensoleillé",
  "Partly cloudy": "Partiellement nuageux",
  "Cloudy": "Nuageux",
  "Overcast": "Couvert",
  "Hail": "Grêle",
  "Rain shower": "Averse de pluie",
  "Light rain": "Pluie légère",
  "Moderate rain": "Pluie modérée",
  "Heavy rain": "Pluie forte",
  "Light rain with thunderstorm" : "Pluie légère avec orage",
  "Thunder and rain": "Averses orageuses",
  "Thunderstorm" : "Orages",
  "Thundery outbreaks in nearby": "Des orages éclatent à proximité",
  "Patchy rain nearby": "Pluie éparse possible",
  "Rain in vicinity": "Pluie éparse possible",
  "Clear": "Clair",
  "Mist": "Brume",
  "Haze":"Brouillard",
  // Ajoute d'autres traductions au besoin
};

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

// 2. Get weather data from api.open-meteo.com

 async function obtenirMeteo(city) {
  const url = `https://api.open-meteo.com/${encodeURIComponent(city)}?format=j1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur de récupération des données météo.");
  const data = await response.json();

  const condition = data.current_condition[0];
  const rawDescription = condition.weatherDesc[0].value;

  if (!traductionsFR[rawDescription]) {
    console.warn("Traduction manquante pour :", rawDescription);
  }

  const translated = traductionsFR[rawDescription] || rawDescription;

  return {
  temp: condition.temp_C,
  humidity: condition.humidity,
  wind: condition.windspeedKmph, 
  description: translated
};
}

// 3. Display the weather in the HTML
// icons source updated to gethub visualcrossing repository

const iconBaseURL = "https://cdn.jsdelivr.net/gh/visualcrossing/WeatherIcons@ea317711649d4c0e6ca34b3dc10cfb225407b12b/SVG/2nd%20Set%20-%20Color";
const iconBase2URL = "https://cdn.jsdelivr.net/gh/visualcrossing/WeatherIcons@6231688b36311be3ed337868e322258c1cb5f2f3/SVG/3rd%20Set%20-%20Color";

const iconMap = {
  "Ensoleillé": `${iconBaseURL}/clear-day.svg`,
  "Partiellement nuageux": `${iconBaseURL}/partly-cloudy-day.svg`,
  "Nuageux": `${iconBaseURL}/cloudy.svg`,
  "Couvert": `${iconBase2URL}/cloudy.svg`,
  "Pluie légère": `${iconBaseURL}/showers-day.svg`,
  "Averse de pluie": `${iconBaseURL}/showers-day.svg`,
  "Pluie modérée": `${iconBase2URL}/rain.svg`,
  "Pluie Forte": `${iconBaseURL}/rain.svg`,
  "Averses orageuses": `${iconBaseURL}/thunder-rain.svg`,
  "Orage":`${iconBaseURL}/thunder.svg`,
  "Des orages éclatent à proximité":`${iconBaseURL}/thunder.svg`,
  "Pluie légère avec orage": `${iconBaseURL}//thunder-showers-day.svg`,
  "Grêle": `${iconBaseURL}/hail.svg`,
  "Pluie éparse possible": `${iconBaseURL}/showers-day.svg`,
  "Clair": `${iconBase2URL}/clear-day.svg`,
  "Brume": `${iconBase2URL}/fog.svg`,
  "Brouillard": `${iconBaseURL}/fog.svg`,
  "Par défaut": `${iconBase2URL}/clear-day.svg`
};

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
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  try {
    const data = await obtenirMeteo(city);
    afficherMeteo(city, data);
  } catch (err) {
    document.getElementById("weather").innerHTML = "Erreur : " + err.message;
    console.error(err);
  }
}

// Initial call and hourly refresh
miseAJourMeteo();                    
setInterval(miseAJourMeteo, 3600000);  // Refresh every hour

//setInterval(miseAJourMeteo, 10000); // for testing: every 10 sec   
