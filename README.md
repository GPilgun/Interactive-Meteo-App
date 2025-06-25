# Application météo interactive (FR)

Une application météo légère, responsive et multilingue (français) qui permet d’obtenir la météo actuelle d’une ville saisie par l’utilisateur, grâce à l’API gratuite **OpenWeatherMap**.

Le site est en ligne sur :

- https://gpilgun.github.io/Interactive-Meteo-App/ 

- https://interactive-meteo-api.netlify.app/


---

## Fonctionnalités

- Saisie dynamique du nom de la ville par l’utilisateur  
- Récupération des données météo en temps réel via l’API OpenWeatherMap (clé intégrée dans le script)  
- Affichage de la température, humidité, vent et description météo traduite en français  
- Affichage automatique d’icônes météo adaptées à la description  
- Horloge en temps réel avec jour, date et heure format français  
- Interface responsive, adaptée aux mobiles et ordinateurs  
- Design simple et épuré avec dégradés et ombres  

---

## Installation & utilisation

1. Cloner ou télécharger le dépôt  
2. Ouvrir le fichier `index.html` (ou ton fichier HTML principal) dans un navigateur moderne (Chrome, Firefox, Edge, Safari…)  
3. Saisir le nom d’une ville dans le champ texte  
4. Cliquer sur **Afficher** ou appuyer sur Entrée  

---

## Dépendances

- [OpenWeatherMap API](https://openweathermap.org/api) (clé intégrée dans le script, gratuite pour usage basique)  
- Polices Google Fonts : Open Sans  
- Icônes météo depuis [Visual Crossing Weather Icons](https://github.com/visualcrossing/WeatherIcons) via CDN jsDelivr  

---

## Personnalisation

- Modifier la clé API dans le script (`apiKey`) pour une clé personnelle  
- Ajouter ou modifier les traductions françaises dans l’objet `traductionsFR`  
- Adapter la map des icônes météo `iconMap` selon vos préférences graphiques  
- Styliser via CSS dans la feuille de style  

---

## Limitations

- La clé API est exposée dans le code client (éviter usage en production sans proxy ou backend sécurisé)  
- Traduction des descriptions partielle, peut être enrichie  
- Recherche uniquement par nom de ville (pas de coordonnées GPS)  
- Gestion basique des erreurs (ex : ville non trouvée)  

---

## Contributions

Contributions bienvenues !  
Merci d’ouvrir une issue ou une pull request pour proposer des améliorations.  

---

## Licence

MIT © 2025 — Créé par [GPilgun](https://github.com/GPilgun) avec l'IA



