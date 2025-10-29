# 🌍 Earthquake Globe

A real-time **3D visualization** of global earthquake activity using data from the **USGS Earthquake API**, built with **React + Three.js (Globe.gl)**.  
The app automatically updates and allows users to explore recent earthquakes with interactive globe markers, magnitude filters, and dynamic data refresh.

---

## 🌐 Live Demo

🔗 **View Deployed App:** [https://aarushinagpure.github.io/earthquake-globe/](https://aarushinagpure.github.io/earthquake-globe/)

---

## 🎯 Project Overview

This project was created as part of the **Aganitha Full Stack Developer Take-Home Challenge (2024–25)**.  
It demonstrates:
- Real-time data fetching from a public API (USGS)
- Data visualization on a 3D interactive globe
- Responsive and user-friendly UI
- LLM-assisted development workflow using **ChatGPT (GPT-5)**

---

## 🧠 How I Worked with AI

Throughout the project, I collaborated with ChatGPT to:
- Interpret the problem statement  
- Choose a suitable API (USGS Earthquake Feed)  
- Design React hooks for data fetching  
- Debug rendering issues in `useEarthquakeData.js`  
- Write clean, modular, and commented code  
- Draft the README and video script  

🔗 **ChatGPT conversation link:** [Insert your ChatGPT link here]

---

## 🚀 Features

- 🌐 **Interactive 3D Globe** built using **Three.js** and **react-globe.gl**
- ⚡ **Real-time data** from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- 🎨 **Magnitude-based color coding & size scaling**
  - 🟢 Green → Minor quakes  
  - 🟡 Yellow → Moderate quakes  
  - 🟠 Orange → Strong quakes  
  - 🔴 Red → Major quakes
- 🕓 **Time range filters:** Last hour, day, week, or month
- 📏 **Magnitude filters:** Focus on quakes above certain magnitudes
- 📊 **Popup info panels** showing location, magnitude, depth, and time
- 💻 **Responsive design** for desktop and mobile

---

## 🧠 Tech Stack

- **Frontend:** React (Create React App)
- **3D Visualization:** Three.js, react-globe.gl
- **Animations:** React Spring
- **Data Fetching:** Axios
- **Color Scaling:** D3-scale
- **Deployment:** GitHub Pages

---

## 🛰️ API Used

**USGS Earthquake API**
- Base URL: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/`
- Formats: GeoJSON (e.g., `all_day.geojson`, `all_week.geojson`)
- No authentication required
---
---

## 💡 Learnings & Reflections

This project helped me practice:

- Efficient API-driven visualization  
- React hooks and cleanup mechanisms  
- Handling async data flow and intervals  
- Communicating with LLMs for iterative debugging  
- Deployment workflow with GitHub Pages  

---

## 🧾 License

This project uses open data from the [USGS Earthquake Feed API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).  
Free for non-commercial use.

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/aarushinagpure/earthquake-globe.git

# Navigate to project folder
cd earthquake-globe

# Install dependencies
npm install

# Start the development server
npm start

# Build for production
npm run build
