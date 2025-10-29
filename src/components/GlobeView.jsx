// src/components/GlobeView.jsx
import React, { useRef, useMemo } from "react";
import ReactGlobe from "react-globe.gl";
import useEarthquakeData from "../hooks/useEarthquakeData";
import { scaleLinear } from "d3-scale";

export default function GlobeView({ timeRange = "day", minMag = 0, onPointClick }) {
  // poll every 5 minutes (300000 ms)
  const { data: quakes, loading, error } = useEarthquakeData(timeRange, minMag, 300000);
  const globeRef = useRef();

  // d3 scales for color and radius
  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, 3, 5, 7, 10])
        .range(["#00ff88", "#ffea00", "#ff8c00", "#ff3b30", "#ff0000"]),
    []
  );

  const radiusScale = useMemo(() => scaleLinear().domain([0, 8]).range([0.2, 6]), []);

  // Points data format for react-globe.gl expects lat/lng fields
  const pointsData = quakes.map((q) => ({
    id: q.id,
    lat: q.coordinates[0],
    lng: q.coordinates[1],
    mag: q.mag,
    depth: q.depth,
    place: q.place,
    time: q.time,
    url: q.url,
    color: colorScale(q.mag),
    radius: Math.max(0.2, radiusScale(q.mag)),
  }));

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {loading && <div className="loading-overlay">Loading earthquakes...</div>}
      {error && <div className="error-overlay">Error fetching data: {error}</div>}

      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        // optional bump map for nice relief
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(6, 12, 21, 1)" // deep dark sky
        pointsData={pointsData}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={(d) => 0.01 + d.radius * 0.002}
        pointColor={(d) => d.color}
        pointRadius={(d) => d.radius}
        pointResolution={8}
        onPointClick={(pt) => onPointClick && onPointClick(pt)}
        showAtmosphere={true}
        atmosphereAltitude={0.25}
        atmosphereColor="rgba(30, 120, 255, 0.12)"
        onGlobeReady={() => {
          // initial camera/zoom
          globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 1000);
        }}
      />
      {/* Legend overlay */}
      <div className="legend">
        <div className="legend-title">Magnitude</div>
        <div className="legend-row"><span className="dot" style={{background:"#00ff88"}}/> &lt; 3</div>
        <div className="legend-row"><span className="dot" style={{background:"#ffea00"}}/> 3–5</div>
        <div className="legend-row"><span className="dot" style={{background:"#ff8c00"}}/> 5–7</div>
        <div className="legend-row"><span className="dot" style={{background:"#ff3b30"}}/> &gt; 7</div>
      </div>
    </div>
  );
}
