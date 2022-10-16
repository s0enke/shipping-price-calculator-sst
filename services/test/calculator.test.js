import { describe, it, expect } from "vitest";
import {
  getMostInexpensiveRate,
  getPossibleRates,
  paeckchen_s,
  paeckchen_m,
  paket_2_kg,
  paket_5_kg,
  paket_10_kg,
  packet_31_5_kg,
} from "@shipping-price-calculator/core/calculator";
describe("shipping calculator", () => {
  it("should calculate", () => {
    // Päckchen
    expect(getMostInexpensiveRate(2000, 35, 25, 10)).toEqual(
      "2 kg - Päckchen S"
    );
    expect(getMostInexpensiveRate(2000, 36, 25, 10)).toEqual(
      "2 kg - Päckchen M"
    );
    expect(getMostInexpensiveRate(2000, 35, 26, 10)).toEqual(
      "2 kg - Päckchen M"
    );
    expect(getMostInexpensiveRate(2000, 35, 25, 11)).toEqual(
      "2 kg - Päckchen M"
    );

    // Paket
    expect(getMostInexpensiveRate(2001, 35, 25, 10)).toEqual("5 kg - Paket");
    expect(getMostInexpensiveRate(2001, 60, 30, 15)).toEqual("5 kg - Paket");
    expect(getMostInexpensiveRate(2001, 61, 30, 15)).toEqual("5 kg - Paket");

    expect(getMostInexpensiveRate(5000, 60, 30, 15)).toEqual("5 kg - Paket");
    expect(getMostInexpensiveRate(5001, 60, 30, 15)).toEqual("10 kg - Paket");

    expect(getMostInexpensiveRate(10000, 60, 30, 15)).toEqual("10 kg - Paket");
    expect(getMostInexpensiveRate(10001, 60, 30, 15)).toEqual(
      "31.5 kg - Paket"
    );
  });

  it("should throw an error with values out of range", () => {
    expect(() => {
      getMostInexpensiveRate(31501, 120, 60, 60);
    }).toThrow(RangeError);
    expect(() => {
      getMostInexpensiveRate(31500, 121, 60, 60);
    }).toThrow(RangeError);
    expect(() => {
      getMostInexpensiveRate(31500, 120, 61, 60);
    }).toThrow(RangeError);
    expect(() => {
      getMostInexpensiveRate(31500, 120, 60, 61);
    }).toThrow(RangeError);
  });

  it("should get possible rates and options", () => {
    expect(getPossibleRates("2 kg - Päckchen S")).toEqual([
      paeckchen_s,
      paeckchen_m,
      paket_2_kg,
      paket_5_kg,
      paket_10_kg,
      packet_31_5_kg,
    ]);
    expect(getPossibleRates("2 kg - Päckchen M")).toEqual([
      paeckchen_m,
      paket_2_kg,
      paket_5_kg,
      paket_10_kg,
      packet_31_5_kg,
    ]);
    expect(getPossibleRates("2 kg - Paket")).toEqual([
      paket_2_kg,
      paket_5_kg,
      paket_10_kg,
      packet_31_5_kg,
    ]);
    expect(getPossibleRates("5 kg - Paket")).toEqual([
      paket_5_kg,
      paket_10_kg,
      packet_31_5_kg,
    ]);
    expect(getPossibleRates("10 kg - Paket")).toEqual([
      paket_10_kg,
      packet_31_5_kg,
    ]);
    expect(getPossibleRates("31.5 kg - Paket")).toEqual([packet_31_5_kg]);
  });
});
