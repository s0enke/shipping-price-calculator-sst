import { useSubmit, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const weight_kg = parseInt(url.searchParams.getAll("weight_kg"));
  const length_cm = parseInt(url.searchParams.getAll("length_cm"));
  const width_cm = parseInt(url.searchParams.getAll("width_cm"));
  const height_cm = parseInt(url.searchParams.getAll("height_cm"));
  const weight_g = weight_kg * 1000;
  const res = await fetch(
    `${process.env.API_URL!}?weight_g=${encodeURIComponent(
      weight_g
    )}&length_cm=${encodeURIComponent(length_cm)}&width_cm=${encodeURIComponent(
      width_cm
    )}&height_cm=${encodeURIComponent(height_cm)}`,
    {}
  );
  if (!res.ok) {
    return json([]);
  }

  return json(await res.json());
}

export default function Index() {
  let shippingRates = useLoaderData();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  return (
    <div className="h-full">
      <h1>Shipping Calculator</h1>
      <form method="get" onChange={(e) => submit(e.currentTarget)}>
        <p>
          <label>
            Weight (kg):
            <input
              name="weight_kg"
              type="number"
              max="31.5"
              step="0.1"
              className="w-24 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
              defaultValue={searchParams.get("weight_kg") as string}
            />
          </label>
        </p>
        <p>
          <label>
            Dimensions (cm):
            <input
              name="length_cm"
              type="number"
              max="120"
              className="w-16 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
              defaultValue={searchParams.get("length_cm") as string}
            />
            x
            <input
              name="width_cm"
              type="number"
              max="60"
              className="w-16 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
              defaultValue={searchParams.get("width_cm") as string}
            />
            x
            <input
              name="height_cm"
              type="number"
              max="60"
              className="w-16 py-2 px-2 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
              defaultValue={searchParams.get("height_cm") as string}
            />
          </label>
        </p>
        <p>
          <button
            type="submit"
            className="py-4 bg-blue-400 rounded text-blue-50 font-bold hover:bg-blue-700"
          >
            search
          </button>
        </p>
      </form>

      <div>
        <div>
          <h1 className="text-xl text-red-500 my-5">
            Available Shipping Rates
          </h1>
        </div>
        <div>
          <div className="columns-1 md:columns-1 lg:columns-xl">
            {shippingRates.map((shippingRate) => (
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
