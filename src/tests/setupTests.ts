import { vi, afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './msw/server'
import '@testing-library/jest-dom/vitest'

// Make sure envs exist so env.ts doesn't throw in tests
vi.stubEnv('VITE_API_BASE_URL', 'https://example.test/api/v1')
vi.stubEnv('VITE_API_KEY', 'test-key')

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
