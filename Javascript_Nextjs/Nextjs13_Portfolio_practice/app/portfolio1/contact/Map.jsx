import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

// 핀 아이콘
const icon = L.icon({
    iconUrl: "/placeholder.png",
    iconSize: [38, 38],
  });

  export default function Map() {
  return (
    <MapContainer center={[29.70182591618066, -95.15842669166062]} zoom={13}>
      <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=HF5XlbsiSdkFlJq0cfDr" />
      <Marker position={[29.70182591618066, -95.15842669166062]} icon={icon}>
        <Popup>This is where I am living</Popup>
      </Marker>
    </MapContainer>
  )
}
