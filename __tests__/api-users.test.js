/**
 * Tests for lib/api/users.js and lib/api/auth.js public functions.
 */

global.fetch = jest.fn();

const { getUsersPaginated, getOneUser } = require('../lib/api/users');
const { getMeApi } = require('../lib/api/auth');

beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

function mockOk(data) {
  fetch.mockResolvedValueOnce({ ok: true, json: async () => data });
}
function mockFail(status, message) {
  fetch.mockResolvedValueOnce({
    ok: false,
    status,
    json: async () => ({ message }),
  });
}

describe('getUsersPaginated', () => {
  it('requests the correct URL with defaults', async () => {
    mockOk({ items: [], meta: { total: 0 } });
    await getUsersPaginated();
    const [url] = fetch.mock.calls[0];
    expect(url).toContain('/users?page=1&limit=10');
  });

  it('includes search parameter when provided', async () => {
    mockOk({ items: [], meta: {} });
    await getUsersPaginated(1, 20, 'mario');
    const [url] = fetch.mock.calls[0];
    expect(url).toContain('search=mario');
  });

  it('omits search parameter when not provided', async () => {
    mockOk({ items: [], meta: {} });
    await getUsersPaginated(1, 10);
    const [url] = fetch.mock.calls[0];
    expect(url).not.toContain('search');
  });
});

describe('getOneUser', () => {
  it('calls GET /users/:id', async () => {
    mockOk({ id: 'user-123', email: 'test@test.com' });
    const result = await getOneUser('user-123');
    const [url] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/users/user-123');
    expect(result.email).toBe('test@test.com');
  });

  it('throws on 404', async () => {
    mockFail(404, 'Utente non trovato');
    await expect(getOneUser('nonexistent')).rejects.toThrow('Utente non trovato');
  });
});

describe('getMeApi', () => {
  it('sends token as Authorization Bearer header', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 'u1', email: 'me@test.com' } }),
    });

    await getMeApi('tok-abc');

    const [, opts] = fetch.mock.calls[0];
    expect(opts.headers['Authorization']).toBe('Bearer tok-abc');
  });

  it('returns null on 401', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 401 });
    const result = await getMeApi('invalid-token');
    expect(result).toBeNull();
  });

  it('calls GET /auth/me', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 'u1' } }),
    });
    await getMeApi('tok');
    const [url] = fetch.mock.calls[0];
    expect(url).toContain('/auth/me');
  });
});
