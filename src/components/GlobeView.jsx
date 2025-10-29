// src/components/GlobeView.jsx
import React, { useRef, useMemo, useEffect } from "react";
import ReactGlobe from "react-globe.gl";
import useEarthquakeData from "../hooks/useEarthquakeData";
import { scaleLinear } from "d3-scale";
import * as THREE from "three";

export default function GlobeView({ timeRange = "day", minMag = 0, onPointClick }) {
  const { data: quakes, loading, error } = useEarthquakeData(timeRange, minMag, 300000);
  const globeRef = useRef();

  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, 3, 5, 7, 10])
        .range(["#00ff88", "#ffea00", "#ff8c00", "#ff3b30", "#ff0000"]),
    []
  );

  const radiusScale = useMemo(() => scaleLinear().domain([0, 8]).range([0.2, 6]), []);

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

  // --- Pulsing animations for major quakes ---
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const scene = globe.scene();
    const pulseObjects = [];

    // remove previous pulses
    scene.children = scene.children.filter((obj) => !obj.userData.isPulse);

    pointsData.forEach((pt) => {
      if (pt.mag > 7) {
        const { lat, lng } = pt;
        const { x, y, z } = globe.getCoords(lat, lng, 1.01);

        const geometry = new THREE.RingGeometry(0.02, 0.03, 64);
        const material = new THREE.MeshBasicMaterial({
          color: "#ff3b30",
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.position.set(x, y, z);
        ring.lookAt(0, 0, 0);
        ring.userData = { isPulse: true };
        scene.add(ring);
        pulseObjects.push(ring);
      }
    });

    const animate = () => {
      pulseObjects.forEach((ring) => {
        const scale = 1 + 0.3 * Math.sin(Date.now() * 0.005);
        ring.scale.set(scale, scale, scale);
        ring.material.opacity = 0.4 + 0.2 * Math.sin(Date.now() * 0.005);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [pointsData]);

  // --- Click-triggered particle ripple ---
  const handlePointClick = (pt) => {
    if (onPointClick) onPointClick(pt);
    const globe = globeRef.current;
    if (!globe) return;
    const scene = globe.scene();
    const { x, y, z } = globe.getCoords(pt.lat, pt.lng, 1.01);

    const geometry = new THREE.RingGeometry(0.01, 0.015, 64);
    const material = new THREE.MeshBasicMaterial({
      color: "#00ffff",
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const ripple = new THREE.Mesh(geometry, material);
    ripple.position.set(x, y, z);
    ripple.lookAt(0, 0, 0);
    scene.add(ripple);

    // animate the ripple outward and fade
    let start = Date.now();
    const duration = 1000;

    const animateRipple = () => {
      const elapsed = Date.now() - start;
      const progress = elapsed / duration;
      if (progress < 1) {
        const scale = 1 + 3 * progress;
        ripple.scale.set(scale, scale, scale);
        ripple.material.opacity = 0.8 * (1 - progress);
        requestAnimationFrame(animateRipple);
      } else {
        scene.remove(ripple);
      }
    };
    animateRipple();
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {loading && <div className="loading-overlay">Loading earthquakes...</div>}
      {error && <div className="error-overlay">Error fetching data: {error}</div>}

      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(6, 12, 21, 1)"
        pointsData={pointsData}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointAltitude={(d) => 0.01 + d.radius * 0.002}
        pointColor={(d) => d.color}
        pointRadius={(d) => d.radius}
        pointResolution={8}
        onPointClick={handlePointClick}
        showAtmosphere={true}
        atmosphereAltitude={0.25}
        atmosphereColor="rgba(30, 120, 255, 0.12)"
        onGlobeReady={() => {
          globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 1000);
        }}
      />

      {/* Legend overlay */}
      <div
        className="legend"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "rgba(10, 20, 30, 0.85)",
          borderRadius: "10px",
          padding: "10px",
          color: "#00ffff",
          fontFamily: "monospace",
          fontSize: "12px",
          boxShadow: "0 0 10px rgba(0,255,255,0.3)",
        }}
      >
        <div className="legend-title" style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Magnitude
        </div>
        <div><span className="dot" style={{ background: "#00ff88" }} /> &lt; 3</div>
        <div><span className="dot" style={{ background: "#ffea00" }} /> 3–5</div>
        <div><span className="dot" style={{ background: "#ff8c00" }} /> 5–7</div>
        <div><span className="dot" style={{ background: "#ff3b30" }} /> &gt; 7 (Pulsing)</div>
        <div style={{ marginTop: "6px", fontSize: "11px", color: "#00b3ff" }}>
          Click quake → Ripple effect
        </div>
      </div>
    </div>
  );
}
