import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import { useStates } from "../hooks/useStates";

export default function SummaryPage() {
  const [params] = useSearchParams();
  const countryId = params.get("countryId") ? Number(params.get("countryId")) : undefined;
  const stateId = params.get("stateId") ? Number(params.get("stateId")) : undefined;

  const { data: countries } = useCountries();
  const { data: states } = useStates(countryId);

  const country = useMemo(() => countries?.find(c => c.id === countryId)?.value, [countries, countryId]);
  const state = useMemo(() => states?.find(s => s.id === stateId)?.value, [states, stateId]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-lg border border-gray-200 transition-shadow duration-300 hover:shadow-xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Your Selection</h1>
        <div className="space-y-4">
          <div className="flex items-center bg-gray-50 rounded-lg p-4">
            <span className="w-32 text-sm text-gray-500 font-medium">Country:</span>
            <span className="text-lg font-semibold text-gray-800">{country ?? "—"}</span>
          </div>
          <div className="flex items-center bg-gray-50 rounded-lg p-4">
            <span className="w-32 text-sm text-gray-500 font-medium">State/Region:</span>
            <span className="text-lg font-semibold text-gray-800">{state ?? "—"}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            to={countryId ? `/?countryId=${countryId}${stateId ? `&stateId=${stateId}` : ""}` : "/"}
            className="inline-block text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200 underline"
          >
            Change Selection
          </Link>
        </div>
      </div>
    </main>
  );
}