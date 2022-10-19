import React from "react";
import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";

function App() {
  const [shippingRates, setShippingRates] = useState([]);
  const [weightKg, setWeightKg] = useState(0);
  const [lengthCm, setLengthCm] = useState(0);
  const [widthCm, setWidthCm] = useState(0);
  const [heightCm, setHeightCm] = useState(0);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL!}?weight_g=${encodeURIComponent(
        (weightKg * 1000).toString()
      )}&length_cm=${encodeURIComponent(
        lengthCm
      )}&width_cm=${encodeURIComponent(widthCm)}&height_cm=${encodeURIComponent(
        heightCm
      )}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return [];
      })
      .then((shippingRates) => {
        setShippingRates(shippingRates!);
      });
  }, [weightKg, lengthCm, widthCm, heightCm]);

  return (
    <div className="h-full">
      <h1>Shipping Calculator</h1>
      <form method="get">
        <p>
          <label>
            Weight (kg):
            <input
              defaultValue={weightKg}
              name="weight_kg"
              onChange={function (e: ChangeEvent<HTMLInputElement>) {
                setWeightKg(parseFloat(e.target.value));
              }}
              type="number"
              max="31.5"
              step="0.1"
              className="w-24 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            />
          </label>
        </p>
        <p>
          <label>
            Dimensions (cm):
            <input
              name="length_cm"
              onChange={function (e: ChangeEvent<HTMLInputElement>) {
                setLengthCm(parseInt(e.target.value));
              }}
              type="number"
              max="120"
              className="w-16 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            />
            x
            <input
              name="width_cm"
              onChange={function (e: ChangeEvent<HTMLInputElement>) {
                setWidthCm(parseInt(e.target.value));
              }}
              type="number"
              max="60"
              className="w-16 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            />
            x
            <input
              name="height_cm"
              onChange={function (e: ChangeEvent<HTMLInputElement>) {
                setHeightCm(parseInt(e.target.value));
              }}
              type="number"
              max="60"
              className="w-16 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
            />
          </label>
        </p>
      </form>

      <div>
        <div>
          <h1 className="text-xl text-red-500 my-5">
            Available Shipping Rates
          </h1>
        </div>
        <div>
          <div className="columns-1 md:columns-1">
            {shippingRates.map((shippingRate: any) => (
              <div
                key={shippingRate.name}
                className="flex flex-col w-full border-solid border-2 border-blue-400 rounded-lg px-2 py-2 my-0.5"
              >
                <h3 className="text-1xl font-semibold">
                  {shippingRate.name}
                  <br />
                  {shippingRate.rate_eur} EUR
                  <br />
                  Insurance:{" "}
                  {shippingRate.liability_eur
                    ? `${shippingRate.liability_eur} EUR`
                    : "❌"}
                  <br />
                  Tracking: {shippingRate.tracking ? "✅" : "❌"}
                  <br />
                  Max Dimensions: {shippingRate.max.length_cm}x
                  {shippingRate.max.width_cm}x{shippingRate.max.height_cm} cm
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
