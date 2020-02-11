import { CrudeFilterPipe } from './crude-filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CrudeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
