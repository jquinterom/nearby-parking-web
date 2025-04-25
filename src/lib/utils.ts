import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const filterLocationsByRadius = (
  locations: LocationType[],
  center: LatLngType,
  radiusKm: number
) => {
  return locations.filter((location) => {
    const distance = haversineDistance(
      center[0],
      center[1],
      location.lat,
      location.lng
    );
    return distance <= radiusKm;
  });
};

// Función para generar un punto aleatorio dentro del radio
export const generateRandomPoint = (
  center: LatLngType,
  minRadius: number,
  maxRadius: number
): LatLngType => {
  const [centerLat, centerLng] = center;

  const centerLatRad = deg2rad(centerLat);
  const centerLngRad = deg2rad(centerLng);

  const distance = minRadius + Math.random() * (maxRadius - minRadius);

  const angle = Math.random() * 2 * Math.PI;

  const earthRadius = 6371000;

  const angularDistance = distance / earthRadius;
  const newLatRad = Math.asin(
    Math.sin(centerLatRad) * Math.cos(angularDistance) +
      Math.cos(centerLatRad) * Math.sin(angularDistance) * Math.cos(angle)
  );
  const newLngRad =
    centerLngRad +
    Math.atan2(
      Math.sin(angle) * Math.sin(angularDistance) * Math.cos(centerLatRad),
      Math.cos(angularDistance) - Math.sin(centerLatRad) * Math.sin(newLatRad)
    );

  return [(newLatRad * 180) / Math.PI, (newLngRad * 180) / Math.PI];
};
