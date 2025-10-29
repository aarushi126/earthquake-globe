# 🌍 Earthquake Globe

An interactive **3D globe visualization** displaying real-time earthquake data using **React**, **Three.js**, and the **USGS Earthquake API**.  
Users can explore global earthquake patterns, magnitudes, and locations in a beautiful, animated experience.

---

## 🚀 Demo
Live Site: https://aarushi126.github.io/earthquake-globe/

---

## 🧠 Features

- 🌐 **3D Globe Visualization** — Powered by Three.js and react-globe.gl.  
- 🌋 **Live Earthquake Data** — Fetches real-time earthquake data from the USGS API.  
- 📊 **Magnitude-based Coloring** — Earthquakes visualized by magnitude intensity.  
- 🕒 **Time-based Animation** — Older earthquakes fade over time.  
- ⚡ **Responsive and Interactive** — Pan, zoom, and hover for details.  
- ☁️ **Automatic Build and Deploy** — Deployed automatically via GitHub Actions to GitHub Pages.

---

## 🛠️ Tech Stack

| Category | Tools |
|-----------|--------|
| **Frontend Framework** | React (Create React App) |
| **3D Visualization** | Three.js, react-globe.gl |
| **Data Source** | USGS Earthquake API |
| **Styling** | Tailwind CSS |
| **Deployment** | GitHub Pages via GitHub Actions |
| **Linting** | ESLint |

---

## 🌋 Data Source

Data is fetched from the official **USGS Earthquake API**:

🔗 [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)

Each earthquake record contains:
- Magnitude  
- Coordinates (latitude, longitude, depth)  
- Location description  
- Timestamp  

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



