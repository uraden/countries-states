import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from '../pages/HomePage'
import { server } from './msw/server'
import { http, HttpResponse } from 'msw'
import { describe, it, expect } from 'vitest'

function renderWithProviders(ui: React.ReactNode) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: 0, staleTime: 0 } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe('HomePage (integration)', () => {
  it('loads countries, enables states after selecting country, and enables submit', async () => {
    server.use(
      http.get('**/countries', () =>
        HttpResponse.json([
          { id: 13, value: 'Australia' },
          { id: 86, value: 'Germany' },
        ])
      ),
      http.get('**/countries/13/states', () =>
        HttpResponse.json([{ id: 1, value: 'Queensland' }])
      )
    )

    renderWithProviders(<HomePage />)

    // COUNTRY: it's a textbox/combobox, not a select
    const countryInput = await screen.findByRole('textbox', { name: /country/i })
    await userEvent.click(countryInput)
    await userEvent.type(countryInput, 'Aus')

    // pick Australia from the popup list
    const australia = await screen.findByText(/Australia/i)
    await userEvent.click(australia)

    // STATE: also a textbox/combobox, so type and pick
    const stateInput =
      (await screen.findByRole('textbox', { name: /state/i })) as HTMLInputElement
    await userEvent.click(stateInput)

    // wait until states are loaded (MSW returns Queensland)
    await userEvent.type(stateInput, 'Queen')
    const qld = await screen.findByText(/Queensland/i)
    await userEvent.click(qld)

    // Submit should be enabled now
    expect(screen.getByRole('button', { name: /review selection/i })).toBeEnabled()
  })
})
