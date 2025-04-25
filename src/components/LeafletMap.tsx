"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-color-markers";

const DefaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  lat: number;
  lng: number;
  title?: string;
}

interface LeafletMapProps {
  locations?: Location[];
  center?: LatLngType;
  zoom?: number;
  circle?: {
    center: L.LatLngExpression;
    radius: number; // en metros
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
  };
}

const LeafletMap = ({
  locations = [],
  center = [0.0, 0.0],
  zoom = 13,
  circle,
}: LeafletMapProps) => {
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={redIcon}
          >
            {location.title && <Popup>{location.title}</Popup>}
          </Marker>
        ))}

        {circle && (
          <Circle
            center={circle.center}
            radius={circle.radius}
            pathOptions={{
              color: circle.color || "blue",
              fillColor: circle.fillColor || "blue",
              fillOpacity: circle.fillOpacity || 0.2,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
