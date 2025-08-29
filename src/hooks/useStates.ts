import { useQuery } from "@tanstack/react-query";
import { fetchStates } from "../lib/api";

export function useStates(countryId?: number){
    return useQuery({
        queryKey: ['states', countryId],
        queryFn: () => fetchStates(countryId!),
        enabled: !!countryId,
    });
}