"use client";

import dynamic from "next/dynamic";
import SliderRadius from "./SliderRadius";
import { useState } from "react";
import { filterLocationsByRadius } from "@/lib/utils";

const Map = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

const center: LatLngType = [1.851763, -76.046773];

const locations: LocationType[] = [
  { lat: 1.855, lng: -76.046775, title: "Marcador 1" },
  { lat: 1.837, lng: -76.04767, title: "Marcador 2" },
  { lat: 1.858, lng: -76.04268, title: "Marcador 3" },
];

const MapPage = () => {
  const [radius, setRadius] = useState(500);
  const [filterLocations, setFilterLocations] = useState<
    LocationType[] | undefined
  >();

  const handleSetRadius = (value: number) => {
    setRadius(value * 1000);

    const filteredLocations = filterLocationsByRadius(locations, center, value);

    setFilterLocations(filteredLocations);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nearby Parking</h1>

      <div className="flex flex-col items-center justify-center gap-8">
        <SliderRadius handleSetRadius={handleSetRadius} />

        <Map
          locations={filterLocations}
          center={center}
          zoom={13}
          circle={{
            center: center,
            radius: radius,
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
