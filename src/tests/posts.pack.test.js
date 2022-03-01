import { Pact } from '@pact-foundation/pact';
import { eachLike, like } from '@pact-foundation/pact/src/dsl/matchers';
import path from 'path';

import { API } from '../api/api';

const provider = new Pact({
  consumer: 'FrontEndWebsite',
  provider: 'BackEndService',
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  logLevel: 'warn',
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
});

describe('API Pact test', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('getting all posts', () => {
    test('posts exists', async () => {
      await provider.addInteraction({
        state: 'posts exist',
        uponReceiving: 'get all posts',
        withRequest: {
          method: 'GET',
          path: '/posts',
          headers: {
            Authorization: like('token'),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: eachLike({
            id: 1,
            userId: 2,
            title: 'Lorem ipsum',
            body: 'description',
          }),
        },
      });

      const api = new API(provider.mockService.baseUrl);
      const posts = await api.getAllPosts();

      expect(posts).toStrictEqual([
        {
          id: 1,
          userId: 2,
          title: 'Lorem ipsum',
          body: 'description',
        },
      ]);
    });
  });
});
