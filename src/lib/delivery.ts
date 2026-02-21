const FREE_DELIVERY_CITIES = new Set(["rabat", "sale"]);

const normalizeCity = (city: string): string =>
  city
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const calculateDelivery = (city: string): number => {
  const normalizedCity = normalizeCity(city);
  return FREE_DELIVERY_CITIES.has(normalizedCity) ? 0 : 35;
};
