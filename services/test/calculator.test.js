import { describe, it, expect } from "vitest";
import { getMostInexpensiveRate } from "@shipping-price-calculator/core/calculator"
describe("shipping calculator", () => {
  it("should calculate", () => {

    // Päckchen
    expect(getMostInexpensiveRate(2000, 35, 25, 10)).toEqual('2 kg - Päckchen S');
    expect(getMostInexpensiveRate(2000, 36, 25, 10)).toEqual('2 kg - Päckchen M');
    expect(getMostInexpensiveRate(2000, 35, 26, 10)).toEqual('2 kg - Päckchen M');
    expect(getMostInexpensiveRate(2000, 35, 25, 11)).toEqual('2 kg - Päckchen M');

    // Paket
    expect(getMostInexpensiveRate(2001, 35, 25, 10)).toEqual('5 kg - Paket');
    expect(getMostInexpensiveRate(2001, 60, 30, 15)).toEqual('5 kg - Paket');
    expect(getMostInexpensiveRate(2001, 61, 30, 15)).toEqual('5 kg - Paket');

    expect(getMostInexpensiveRate(5000, 60, 30, 15)).toEqual('5 kg - Paket');
    expect(getMostInexpensiveRate(5001, 60, 30, 15)).toEqual('10 kg - Paket');

    expect(getMostInexpensiveRate(10000, 60, 30, 15)).toEqual('10 kg - Paket');
    expect(getMostInexpensiveRate(10001, 60, 30, 15)).toEqual('31.5 kg - Paket');

    expect(getMostInexpensiveRate(31501, 60, 30, 15)).toThrow(TypeError);


  });
});
