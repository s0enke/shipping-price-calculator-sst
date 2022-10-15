import { expect, it } from "vitest";
import { Config } from "@serverless-stack/node/config";
const axios = require('axios');
import {
  paeckchen_s,
  paeckchen_m,
  paket_2_kg,
  paket_5_kg,
  paket_10_kg,
  packet_31_5_kg,
} from "@shipping-price-calculator/core/calculator"

it("returns the valid shipping rates", async () => {
  let result;
  result = await axios.get(Config.API_URL, {
    params: {
      "weight_g": 30000,
      "length_cm": 60,
      "height_cm": 60,
      "width_cm": 60,
    }
  });
  expect(result.data).toEqual([
    packet_31_5_kg
  ]);
  result = await axios.get(Config.API_URL, {
    params: {
      "weight_g": 1000,
      "length_cm": 36,
      "height_cm": 10,
      "width_cm": 10,
    }
  });
  expect(result.data).toEqual([
    paeckchen_m,
    paket_2_kg,
    paket_5_kg,
    paket_10_kg,
    packet_31_5_kg,
  ]);
});