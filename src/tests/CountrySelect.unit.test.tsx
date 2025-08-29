import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CountrySelect from "../components/CountrySelect";
import { server } from "./msw/server";
import { http, HttpResponse } from "msw";
import { test, expect } from "vitest";

function renderWithProviders(ui: React.ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: 0, staleTime: 0 } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

test("filters countries by search (combobox)", async () => {
  server.use(
    http.get("**/countries", () =>
      HttpResponse.json([
        { id: 1, value: "Åland Islands" },
        { id: 2, value: "Albania" },
      ])
    )
  );

  renderWithProviders(<CountrySelect value={undefined} onChange={() => {}} />);


  const input =
    (await screen.findByRole("textbox", { name: /country|search country/i })) as HTMLInputElement;

  await userEvent.click(input);
  await userEvent.type(input, "Aland");


  expect(await screen.findByText("Åland Islands")).toBeInTheDocument();
  expect(screen.queryByText("Albania")).toBeNull();
});
