/**
 * Tests for lib/api/missions.js
 */

global.fetch = jest.fn();

const {
  getMissions,
  getMissionsPaginated,
  getOneMission,
  createMission,
  updateMission,
  deleteMission,
  getMissionChartStats,
} = require('../lib/api/missions');

beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

function mockOk(data) {
  fetch.mockResolvedValueOnce({ ok: true, json: async () => data });
}

describe('getMissions', () => {
  it('calls GET /missions', async () => {
    mockOk([]);
    await getMissions();
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/missions',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});

describe('getMissionsPaginated', () => {
  it('builds the correct query string', async () => {
    mockOk({ items: [], meta: {} });
    await getMissionsPaginated(2, 5, 'apollo');
    const [url] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/missions/paginated?page=2&limit=5&search=apollo');
  });

  it('omits search param when empty', async () => {
    mockOk({ items: [], meta: {} });
    await getMissionsPaginated(1, 10, '');
    const [url] = fetch.mock.calls[0];
    expect(url).not.toContain('search');
  });
});

describe('getOneMission', () => {
  it('calls GET /missions/:id', async () => {
    mockOk({ id: 'abc' });
    await getOneMission('abc');
    const [url] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/missions/abc');
  });
});

describe('createMission', () => {
  it('calls POST /missions with body', async () => {
    mockOk({ id: 'new-1' });
    await createMission({ name: 'Artemis IV' });
    const [url, opts] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/missions');
    expect(opts.method).toBe('POST');
    expect(JSON.parse(opts.body)).toEqual({ name: 'Artemis IV' });
  });
});

describe('updateMission', () => {
  it('calls PATCH /missions/:id with body', async () => {
    mockOk({ id: 'abc' });
    await updateMission('abc', { status: 'CONFIRMED' });
    const [url, opts] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/missions/abc');
    expect(opts.method).toBe('PATCH');
    expect(JSON.parse(opts.body)).toEqual({ status: 'CONFIRMED' });
  });
});

describe('deleteMission', () => {
  it('calls DELETE /missions/:id', async () => {
    mockOk({});
    await deleteMission('abc');
    const [url, opts] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/missions/abc');
    expect(opts.method).toBe('DELETE');
  });
});

describe('getMissionChartStats', () => {
  it('calls GET /missions/chart-stats', async () => {
    mockOk({ upcoming: [], byMonth: [], byStatus: [] });
    const result = await getMissionChartStats();
    const [url] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:5000/missions/chart-stats');
    expect(result).toHaveProperty('upcoming');
  });
});
