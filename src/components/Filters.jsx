// src/components/Filters.jsx
import React from "react";

export default function Filters({ timeRange, setTimeRange, minMag, setMinMag }) {
  return (
    <div className="controls-card">
      <h3>Filters</h3>

      <div className="control-group">
        <label>Time range</label>
        <div className="btn-row">
          {["hour", "day", "week", "month"].map((r) => (
            <button
              key={r}
              className={`btn ${timeRange === r ? "active" : ""}`}
              onClick={() => setTimeRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label>Minimum magnitude: <strong>{minMag}</strong></label>
        <input
          type="range"
          min="0"
          max="8"
          step="0.1"
          value={minMag}
          onChange={(e) => setMinMag(Number(e.target.value))}
        />
      </div>

      <div className="control-footer">
        <small>Data source: USGS</small>
      </div>
    </div>
  );
}
