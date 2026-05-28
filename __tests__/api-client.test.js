/**
 * Tests for lib/api/client.js — the core fetch wrapper used by all API calls.
 */

global.fetch = jest.fn();

const { apiFetch } = require('../lib/api/client');

beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

describe('apiFetch', () => {
  it('calls the correct URL with GET by default', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ missions: 5 }),
    });

    const result = await apiFetch('/stats');

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/stats');
    expect(options.method).toBe('GET');
    expect(result).toEqual({ missions: 5 });
  });

  it('includes Authorization header when token is in localStorage', async () => {
    localStorage.setItem('sb_access_token', 'my-token-123');
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await apiFetch('/auth/me');

    const [, options] = fetch.mock.calls[0];
    expect(options.headers['Authorization']).toBe('Bearer my-token-123');
  });

  it('omits Authorization header when no token in localStorage', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await apiFetch('/stats');

    const [, options] = fetch.mock.calls[0];
    expect(options.headers['Authorization']).toBeUndefined();
  });

  it('sends JSON body for POST requests', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: '1' }) });

    await apiFetch('/missions', 'POST', { name: 'Apollo 11' });

    const [, options] = fetch.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.body).toBe(JSON.stringify({ name: 'Apollo 11' }));
    expect(options.headers['Content-Type']).toBe('application/json');
  });

  it('sends null body for GET requests', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await apiFetch('/stats');

    const [, options] = fetch.mock.calls[0];
    expect(options.body).toBeNull();
  });

  it('throws an Error when response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not found' }),
    });

    await expect(apiFetch('/missions/nonexistent')).rejects.toThrow('Not found');
  });

  it('falls back to generic error message when response has no message field', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await expect(apiFetch('/crash')).rejects.toThrow('API error: 500');
  });

  it('includes credentials: include on every request', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    await apiFetch('/stats');

    const [, options] = fetch.mock.calls[0];
    expect(options.credentials).toBe('include');
  });
});
