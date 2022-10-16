import { expect } from "vitest";

export function getMostInexpensiveRate(
  weight_g: number,
  length_cm: number,
  width_cm: number,
  height_cm: number
): string {
  if (weight_g > 31500) {
    throw new RangeError();
  }

  if (length_cm > 120 || width_cm > 60 || height_cm > 60) {
    throw new RangeError();
  }

  if (weight_g > 10000) {
    return "31.5 kg - Paket";
  }
  if (weight_g > 5000) {
    return "10 kg - Paket";
  }
  if (weight_g > 2000) {
    return "5 kg - Paket";
  }
  if (length_cm > 35 || width_cm > 25 || height_cm > 10) {
    return "2 kg - Päckchen M";
  }
  return "2 kg - Päckchen S";
}

interface ShippingRate {
  name: string;
  rate_eur: number;
  max: {
    weight_g: number;
    length_cm: number;
    width_cm: number;
    height_cm: number;
  };
  liability_eur: null | number;
  tracking: boolean;
}

export const paeckchen_s = {
  name: "2 kg - Päckchen S",
  rate_eur: 3.99,
  max: {
    weight_g: 2000,
    length_cm: 35,
    width_cm: 25,
    height_cm: 10,
  },
  liability_eur: null,
  tracking: false,
} as ShippingRate;
export const paeckchen_m = {
  name: "2 kg - Päckchen M",
  rate_eur: 4.79,
  max: {
    weight_g: 2000,
    length_cm: 60,
    width_cm: 30,
    height_cm: 15,
  },
  liability_eur: null,
  tracking: false,
} as ShippingRate;
export const paket_2_kg = {
  name: "2 kg - Paket",
  rate_eur: 5.49,
  max: {
    weight_g: 2000,
    length_cm: 60,
    width_cm: 30,
    height_cm: 15,
  },
  liability_eur: 500,
  tracking: false,
} as ShippingRate;
export const paket_5_kg = {
  name: "5 kg - Paket",
  rate_eur: 6.99,
  max: {
    weight_g: 5000,
    length_cm: 120,
    width_cm: 60,
    height_cm: 60,
  },
  liability_eur: 500,
  tracking: true,
};
export const paket_10_kg = {
  name: "10 kg - Paket",
  rate_eur: 9.49,
  max: {
    weight_g: 10000,
    length_cm: 120,
    width_cm: 60,
    height_cm: 60,
  },
  liability_eur: 500,
  tracking: true,
} as ShippingRate;
export const packet_31_5_kg = {
  name: "31.5 kg - Paket",
  rate_eur: 16.49,
  max: {
    weight_g: 31500,
    length_cm: 120,
    width_cm: 60,
    height_cm: 60,
  },
  liability_eur: 500,
  tracking: true,
} as ShippingRate;

export function getPossibleRates(rate: string): ShippingRate[] {
  switch (rate) {
    case "2 kg - Päckchen M":
      return [paeckchen_m, paket_2_kg, paket_5_kg, paket_10_kg, packet_31_5_kg];
    case "2 kg - Paket":
      return [paket_2_kg, paket_5_kg, paket_10_kg, packet_31_5_kg];
    case "5 kg - Paket":
      return [paket_5_kg, paket_10_kg, packet_31_5_kg];
    case "10 kg - Paket":
      return [paket_10_kg, packet_31_5_kg];
    case "31.5 kg - Paket":
      return [packet_31_5_kg];
    default:
      return [
        paeckchen_s,
        paeckchen_m,
        paket_2_kg,
        paket_5_kg,
        paket_10_kg,
        packet_31_5_kg,
      ];
  }
}
