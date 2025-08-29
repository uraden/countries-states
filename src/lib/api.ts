import { http } from './http';
import type { Option } from '../types/api';

export async function fetchCountries(): Promise<Option[]> {
    const { data } = await http.get<Option[]>('/countries');
    return data;
}

export async function fetchStates(countryId: number): Promise<Option[]> {
  const { data } = await http.get<Option[]>(`/countries/${countryId}/states`);
  return data;
}