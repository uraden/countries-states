import { useMemo, useState, useRef, useEffect } from "react";
import { useCountries } from "../hooks/useCountries";
import { Field } from "./Field";
import { normalizeText } from "../lib/text";

type Props = {
  value?: number;
  onChange: (id?: number) => void;
};

export default function CountrySelect({ value, onChange }: Props) {
  const { data, isLoading, isError, refetch } = useCountries();
  const [q, setQ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const list = data ?? [];
    const nQ = normalizeText(q);
    return !nQ
      ? list
      : list.filter((o) => normalizeText(o.value).includes(nQ));
  }, [data, q]);

  const selectedCountry = useMemo(() => {
    return data?.find((c) => c.id === value)?.value ?? "";
  }, [value, data]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Field
      label="Country"
      htmlFor="country"
      hint="Pick a country to load its states."
      error={isError ? "Failed to load countries." : undefined}
    >
      {isError && (
        <div className="mt-1">
          <button
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
      ) : (
        <div className="relative" ref={wrapperRef}>
          <input
            type="text"
            id="country"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm placeholder-gray-400 text-sm"
            placeholder="Select or type a country…"
            value={isOpen ? q : selectedCountry}
            onChange={(e) => {
              setQ(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            aria-label="Select country"
            autoComplete="off"
          />
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.id}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-150"
                    onClick={() => {
                      onChange(c.id);
                      setQ("");
                      setIsOpen(false);
                    }}
                  >
                    {c.value}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </Field>
  );
}