/**
 * Format price in Moroccan Dirham (MAD)
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Configuration for delivery
 */
export const DELIVERY_CONFIG = {
  FREE_DELIVERY_CITY: 'Casablanca', // Replace with your city
  PAID_DELIVERY_FEE: 30, // MAD
};

/**
 * Calculate delivery fee based on city
 */
export const getDeliveryFee = (city: string): number => {
  return city === DELIVERY_CONFIG.FREE_DELIVERY_CITY ? 0 : DELIVERY_CONFIG.PAID_DELIVERY_FEE;
};

/**
 * Calculate order totals
 */
export const calculateTotals = (subtotal: number, city: string) => {
  const delivery_fee = getDeliveryFee(city);
  const total = subtotal + delivery_fee;
  return { delivery_fee, total };
};
