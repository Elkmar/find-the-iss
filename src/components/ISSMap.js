import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ISSMap.css";
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ISSMap = ({ latitude, longitude }) => {
  return (
    <MapContainer
        center={[latitude, longitude]}
        zoom={3}
        className="iss-map"
    >
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[latitude, longitude]}>
        <Popup>
                ISS Position <br />
                Latitude: {latitude} <br />
                Longitude: {longitude}
        </Popup>
    </Marker>
    </MapContainer>
  );
};

export default ISSMap;
