import { useMemo, useState, useRef, useEffect } from "react";
import { Field } from "./Field";
import { useStates } from "../hooks/useStates";

export default function StateSelect({
  countryId,
  value,
  onChange,
}: {
  countryId?: number;
  value?: number;
  onChange: (id?: number) => void;
}) {
  const { data, isLoading, isError, refetch } = useStates(countryId);
  const [q, setQ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const disabled = !countryId;

  const filtered = useMemo(() => {
    const list = data ?? [];
    const nQ = q.toLowerCase().trim();
    return !nQ ? list : list.filter((s) => s.value.toLowerCase().includes(nQ));
  }, [data, q]);

  const selectedState = useMemo(() => {
    return data?.find((s) => s.id === value)?.value ?? "";
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
      label="State / Region"
      htmlFor="state"
      hint={disabled ? "Select a country first." : undefined}
      error={isError ? "Failed to load states." : undefined}
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
      {isLoading && !disabled ? (
        <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
      ) : (
        <div className="relative" ref={wrapperRef}>
          <input
            type="text"
            id="state"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm placeholder-gray-400 text-sm ${
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            placeholder={disabled ? "Select a country first…" : "Select or type a state…"}
            value={isOpen && !disabled ? q : selectedState}
            onChange={(e) => {
              setQ(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => !disabled && setIsOpen(true)}
            disabled={disabled}
            aria-label="Select state"
            autoComplete="off"
          />
          {isOpen && !disabled && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
              ) : (
                filtered.map((s) => (
                  <button
                    key={s.id}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-150"
                    onClick={() => {
                      onChange(s.id);
                      setQ("");
                      setIsOpen(false);
                    }}
                  >
                    {s.value}
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