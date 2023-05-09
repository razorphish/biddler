import { whooshDb } from './whoosh-db';

describe('whooshDb', () => {
  it('should work', () => {
    expect(whooshDb()).toEqual('whoosh-db');
  });
});
