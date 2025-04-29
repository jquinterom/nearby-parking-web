"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { filterLocationsByRadius } from "@/lib/utils";
import { locationsGenerator } from "@/lib/database/Locations";
import { useCreateNewLocation } from "@/hooks/useCreateNewLocation";
import NewPointForm from "@/components/NewPointForm/NewPointForm";
import Filters from "./map/Filters";

const Map = dynamic(() => import("@/components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const center: LatLngType = [1.851763, -76.046773];

const DEFAULT_RADIUS = 500;

const MapPage = () => {
  const [isClient, setIsClient] = useState(false);

  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [filterByChecked, setFilterByChecked] = useState<string | null>(null);
  const [filterLocations, setFilterLocations] = useState<
    LocationType[] | undefined
  >();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const LOCATIONS: LocationType[] = useMemo(() => {
    const newLocations = locationsGenerator(center);
    if (isClient) {
      try {
        const savedLocations = localStorage.getItem("locations");
        if (savedLocations) {
          const parsedLocations = JSON.parse(savedLocations) as LocationType[];
          return [...newLocations, ...parsedLocations];
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }

    return newLocations;
  }, [isClient]);

  const {
    handleCreateNewLocation,
    location,
    saveOnLocalStorage,
    handleCancelNewLocation,
  } = useCreateNewLocation();

  const saveNewPoint = (location: LocationType) => {
    saveOnLocalStorage(location);

    setFilterLocations((prevLocations) => {
      if (!prevLocations) {
        return [location];
      }

      const newLocations = [...prevLocations, location];
      return newLocations;
    });
  };

  const handleCancelNewPoint = () => {
    handleCancelNewLocation();
  };

  const handleSetNewFilteredLocations = useCallback(
    (radius: number, filterByChecked: string | null) => {
      const newLocations = LOCATIONS.filter((location) => {
        if (filterByChecked === null) {
          return true;
        }

        return location.isFree === (filterByChecked === "free");
      });

      const filteredLocations = filterLocationsByRadius(
        newLocations,
        center,
        radius
      );

      setFilterLocations(filteredLocations);
    },
    [LOCATIONS]
  );

  useEffect(() => {
    if (LOCATIONS.length > 0) {
      handleSetNewFilteredLocations(DEFAULT_RADIUS / 1000, null);
    }
  }, [LOCATIONS, handleSetNewFilteredLocations]);

  const handleSetRadius = (value: number) => {
    setRadius(value * 1000);

    handleSetNewFilteredLocations(value, filterByChecked);
  };

  const handleSetChecked = (value: string | null) => {
    setFilterByChecked(value);
    handleSetNewFilteredLocations(radius / 1000, value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nearby Parking</h1>

      <div className="flex flex-col items-center justify-center gap-8">
        <Filters
          handleSetRadius={handleSetRadius}
          handleSetChecked={handleSetChecked}
        />

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
          onDoubleClick={(location) => handleCreateNewLocation(location)}
        />

        <span className="text-gray-500 text-sm">
          Double click on the map to add a new parking
        </span>

        {location && (
          <NewPointForm
            location={location}
            onSubmit={saveNewPoint}
            onCancel={handleCancelNewPoint}
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;
