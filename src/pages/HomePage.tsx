
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CountrySelect from "../components/CountrySelect";
import StateSelect from "../components/StateSelect";

export default function HomePage() {
  const [params, setParams] = useSearchParams();
  const [countryId, setCountryId] = useState<number | undefined>(
    params.get("countryId") ? Number(params.get("countryId")) : undefined
  );
  const [stateId, setStateId] = useState<number | undefined>(
    params.get("stateId") ? Number(params.get("stateId")) : undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    setStateId(undefined);
  }, [countryId]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (countryId) next.set("countryId", String(countryId));
    if (stateId) next.set("stateId", String(stateId));
    setParams(next, { replace: true });
  }, [countryId, stateId, setParams]);

  const isValid = !!countryId && !!stateId;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Country & State Selector</h1>
          <p className="mt-2 text-sm text-gray-500">Choose a country and state to proceed.</p>
        </header>

        <div className="space-y-6">
          <CountrySelect value={countryId} onChange={setCountryId} />
          <StateSelect countryId={countryId} value={stateId} onChange={setStateId} />
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            className="rounded-lg bg-gray-100 border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200 hover:cursor-pointer"
            onClick={() => {
              setCountryId(undefined);
              setStateId(undefined);
            }}
          >
            Reset
          </button>
          <button
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 hover:cursor-pointer"
            disabled={!isValid}
            onClick={() => navigate(`/summary?countryId=${countryId}&stateId=${stateId}`)}
          >
            Review Selection
          </button>
        </div>
      </div>
    </main>
  );
}