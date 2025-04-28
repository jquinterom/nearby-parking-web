import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { BlueIcon } from "../IconMap";

interface LocationMarkerProps {
  onDoubleClick?: (location: L.LatLng) => void;
}
export const LocationMarker = ({ onDoubleClick }: LocationMarkerProps) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const handleDoubleClick = (e: L.LeafletMouseEvent) => {
    setPosition(e.latlng);
    onDoubleClick?.(e.latlng);
  };

  useMapEvents({
    dblclick(e) {
      handleDoubleClick(e);
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
