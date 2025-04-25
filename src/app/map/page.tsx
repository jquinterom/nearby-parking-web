"use client";

import dynamic from "next/dynamic";
import SliderRadius from "./SliderRadius";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filterLocationsByRadius } from "@/lib/utils";
import { locationsGenerator } from "@/lib/database/Locations";

const Map = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

const center: LatLngType = [1.851763, -76.046773];

const DEFAULT_RADIUS = 500;

const MapPage = () => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [filterLocations, setFilterLocations] = useState<
    LocationType[] | undefined
  >();

  const LOCATIONS: LocationType[] = useMemo(
    () => locationsGenerator(center),
    []
  );

  const handleSetNewFilteredLocations = useCallback(
    (radius: number) => {
      const filteredLocations = filterLocationsByRadius(
        LOCATIONS,
        center,
        radius
      );
      setFilterLocations(filteredLocations);
    },
    [LOCATIONS]
  );

  useEffect(() => {
    if (LOCATIONS.length > 0) {
      handleSetNewFilteredLocations(DEFAULT_RADIUS / 1000);
    }
  }, [LOCATIONS, handleSetNewFilteredLocations]);

  const handleSetRadius = (value: number) => {
    setRadius(value * 1000);

    handleSetNewFilteredLocations(value);
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
            color: "#66b2ff",
            fillColor: "#99CCFF",
            fillOpacity: 0.3,
          }}
        />
      </div>
    </div>
  );
};

export default MapPage;
