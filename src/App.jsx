// src/App.jsx
import React, { useState } from "react";
import GlobeView from "./components/GlobeView";
import Filters from "./components/Filters";
import InfoPanel from "./components/InfoPanel";
import "./styles/theme.css";

export default function App() {
  const [selectedQuake, setSelectedQuake] = useState(null);
  const [timeRange, setTimeRange] = useState("day"); // hour | day | week | month
  const [minMag, setMinMag] = useState(0);

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="brand">
          <span className="globe-emoji">🌐</span>
          <h1>SeismoScope — Earthquake Globe</h1>
        </div>
        <div className="meta">Real-time USGS data · Dark seismograph theme</div>
      </header>

      <main className="main-grid">
        <aside className="left-controls">
          <Filters
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            minMag={minMag}
            setMinMag={setMinMag}
          />
        </aside>

        <section className="globe-container">
          <GlobeView
            timeRange={timeRange}
            minMag={minMag}
            onPointClick={(q) => setSelectedQuake(q)}
          />
        </section>
      </main>

      <InfoPanel quake={selectedQuake} onClose={() => setSelectedQuake(null)} />
      <footer className="footer">Built with ☕ and a love for geoscience</footer>
    </div>
  );
}
