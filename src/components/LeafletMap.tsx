"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-color-markers";
import { BlueIcon, DefaultIcon, GrayIcon, GreenIcon, RedIcon } from "./IconMap";

L.Marker.prototype.options.icon = DefaultIcon;

const markIcon = (location: LocationType) => {
  console.log(
    "location",
    `${location.title} - ${location.isFree ? "Free" : "Pay"} ${
      location.isOpen ? "Open" : "Closed"
    } ${location.isBusy && " • Busy"}`
  );

  if (location.isBusy || !location.isOpen) {
    return GrayIcon;
  }
  return location.isFree ? GreenIcon : RedIcon;
};

interface LeafletMapProps {
  locations?: LocationType[];
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

const LocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    dblclick(e) {
      setPosition(e.latlng);
      console.log("Coordenadas capturadas:", e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={BlueIcon}>
      <Popup>
        Ubicación seleccionada: <br />
        Lat: {position.lat.toFixed(6)}, <br />
        Lng: {position.lng.toFixed(6)}
      </Popup>
    </Marker>
  );
};

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
            icon={markIcon(location)}
          >
            {location.title && (
              <Popup>
                <span className="font-bold">{location.title}</span>
                <br />
                <span>
                  {location.isFree ? "Free" : "Pay"} {"• "}
                </span>
                <span>{location.isOpen ? "Open" : "Closed"}</span>
                <span>{location.isBusy && " • Busy"}</span>
                <br />
                {location.price && <span>Price: {location.price}$</span>}
              </Popup>
            )}
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

        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
