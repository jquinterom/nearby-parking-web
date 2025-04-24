"use client";

import dynamic from "next/dynamic";
import SliderRadius from "./SliderRadius";

const Map = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

const center: [number, number] = [1.851763, -76.046773];

const MapPage = () => {
  const locations = [
    { lat: 1.855, lng: -76.046775, title: "Marcador 1" },
    { lat: 1.831, lng: -76.04767, title: "Marcador 2" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa con Leaflet</h1>

      <div className="flex flex-col items-center justify-center gap-8">
        <SliderRadius />

        <Map
          locations={locations}
          center={center}
          zoom={13}
          circle={{
            center: center,
            radius: 500, // 500 metros
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.3,
          }}
        />
      </div>
    </div>
  );
};

export default MapPage;
