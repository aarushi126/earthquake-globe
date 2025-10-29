# 🌍 Earthquake Globe — Real-Time Seismic Visualizer

A stunning interactive 3D globe that visualizes real-time earthquake data from the **USGS Earthquake API**.  
Designed with a dark, seismograph-inspired aesthetic, this project provides an immersive way to explore global seismic activity.

---

## 🚀 Features

- 🌐 **Interactive 3D Globe** built using **Three.js** and **react-globe.gl**
- ⚡ **Real-time data** from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- 🎨 **Magnitude-based color coding & size scaling**
  - Green → Minor quakes
  - Yellow → Moderate quakes
  - Orange → Strong quakes
  - Red → Major quakes
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
