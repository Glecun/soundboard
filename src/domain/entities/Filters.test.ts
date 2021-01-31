import Filters from './Filters';
import Sound from './Sound';

describe('FiltersTest', () => {
  const sound1 = new Sound('toto', 'tata', '');
  it.each([
    ['no filters', new Filters(''), [sound1], [sound1]],
    ['search name exact match', new Filters('toto'), [sound1], [sound1]],
    ['search name not exact match', new Filters('tot'), [sound1], [sound1]],
    ['search author exact match', new Filters('tata'), [sound1], [sound1]],
    ['search author not exact match', new Filters('tat'), [sound1], [sound1]],
    [
      'there is accent and different case',
      new Filters('ôt'),
      [sound1],
      [sound1],
    ],
    ['no match', new Filters('fromage'), [sound1], []],
  ])(
    'should apply filters when %s',
    (
      _testName: string,
      filters: Filters,
      sounds: Sound[],
      expectedSounds: Sound[]
    ) => {
      const result = filters.applyFilters(sounds);
      expect(result).toEqual(expectedSounds);
    }
  );
});
