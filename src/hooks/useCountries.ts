import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../lib/api";

export function useCountries() {
    return useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries
    });
}