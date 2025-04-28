import { useState } from "react";

export const useCreateNewLocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);

  const handleCreateNewLocation = (location: L.LatLng) => {
    const newPoint: LocationType = {
      lat: location.lat,
      lng: location.lng,
      title: "",
      isFree: false,
      isOpen: true,
      isBusy: false,
      price: 0,
    };

    setLocation(newPoint);
  };

  const handleCancelNewLocation = () => {
    setLocation(null);
  };

  const saveOnLocalStorage = (location: LocationType) => {
    const savedLocation = localStorage.getItem("locations");

    if (savedLocation) {
      const savedLocations = JSON.parse(savedLocation);
      savedLocations.push(location);
      localStorage.setItem("locations", JSON.stringify(savedLocations));
    } else {
      localStorage.setItem("locations", JSON.stringify([location]));
    }
  };

  return {
    handleCreateNewLocation,
    location,
    saveOnLocalStorage,
    handleCancelNewLocation,
  };
};
