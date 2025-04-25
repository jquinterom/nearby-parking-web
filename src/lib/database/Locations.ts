import { generateRandomPoint } from "../utils";

export const locationsGenerator = (
  center: LatLngType,
  count: number = 10,
  minRadius: number = 50,
  maxRadius: number = 2000
): LocationType[] => {
  const locations: LocationType[] = [];

  for (let i = 0; i < count; i++) {
    // Generar punto aleatorio
    const [lat, lng] = generateRandomPoint(center, minRadius, maxRadius);

    locations.push({
      lat,
      lng,
      title: `Nearby parking ${i + 1}`,
      isFree: Math.random() > 0.8,
      isOpen: Math.random() > 0.1,
      isBusy: Math.random() > 0.7,
      price: Math.floor(Math.random() * 10) + 1, // Precio entre 1 y 10
    });
  }

  return locations;
};
