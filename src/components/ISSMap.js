import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ISSMap.css";
import L from "leaflet";

// Custom ISS satellite icon
const issIcon = new L.DivIcon({
  className: 'iss-icon',
  html: `
    <div class="iss-marker">
      <svg viewBox="0 0 64 64" width="40" height="40">
        <!-- Solar panels -->
        <rect x="4" y="28" width="20" height="8" fill="#3b82f6" opacity="0.8"/>
        <rect x="40" y="28" width="20" height="8" fill="#3b82f6" opacity="0.8"/>
        <!-- Panel lines -->
        <line x1="4" y1="32" x2="24" y2="32" stroke="#1e40af" stroke-width="1"/>
        <line x1="40" y1="32" x2="60" y2="32" stroke="#1e40af" stroke-width="1"/>
        <!-- Main body -->
        <rect x="24" y="26" width="16" height="12" rx="2" fill="#e2e8f0"/>
        <!-- Body details -->
        <rect x="26" y="28" width="4" height="3" fill="#3b82f6"/>
        <rect x="34" y="28" width="4" height="3" fill="#10b981"/>
        <circle cx="32" cy="35" r="2" fill="#64748b"/>
      </svg>
      <div class="iss-pulse"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

// Component to update map center when position changes
const MapUpdater = ({ latitude, longitude }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([latitude, longitude], map.getZoom(), {
      animate: true,
      duration: 1
    });
  }, [latitude, longitude, map]);
  return null;
};

const ISSMap = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={3}
      className="iss-map"
      zoomControl={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <Marker position={[latitude, longitude]} icon={issIcon}>
        <Popup className="iss-popup">
          <strong>🛰️ International Space Station</strong><br />
          Latitude: {latitude}°<br />
          Longitude: {longitude}°
        </Popup>
      </Marker>
      <MapUpdater latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default ISSMap;
