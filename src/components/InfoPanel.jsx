// src/components/InfoPanel.jsx
import React from "react";
import { animated, useSpring } from "react-spring";

export default function InfoPanel({ quake, onClose }) {
  const props = useSpring({ transform: quake ? `translateX(0%)` : `translateX(110%)`, config: { tension: 280, friction: 30 } });

  if (!quake) return <animated.div style={{ ...props }} className="info-panel-closed" />;

  const date = new Date(quake.time);

  return (
    <animated.div style={props} className="info-panel">
      <button className="close-btn" onClick={onClose}>✕</button>
      <h2 style={{ color: quake.color }}>Magnitude {quake.mag}</h2>
      <p className="place">{quake.place}</p>
      <p><strong>Depth:</strong> {quake.depth} km</p>
      <p><strong>Time:</strong> {date.toLocaleString()}</p>
      <a className="usgs-link" href={quake.url} target="_blank" rel="noreferrer">View on USGS</a>
      <div className="more-analytics">
        <h4>Quick stats</h4>
        <ul>
          <li>Lat: {quake.lat.toFixed(3)}</li>
          <li>Lng: {quake.lng.toFixed(3)}</li>
          <li>Radius: {quake.radius}</li>
        </ul>
      </div>
    </animated.div>
  );
}
