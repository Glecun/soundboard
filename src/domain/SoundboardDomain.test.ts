import { SoundboardDomain } from './SoundboardDomain';
import Sound from './entities/Sound';
import Source from './entities/Source';
import Filters from './entities/Filters';

describe('SoundboardDomainTest', () => {
  const localSoundAdapter: any = {
    getSounds: jest.fn(() => []),
  };
  const myInstantSoundAdapter: any = {
    getSounds: jest.fn(() => []),
  };
  const userPreferenceAdapter: any = {
    getUserPreferences: jest.fn(() => ({ pathToSoundsJson: '' })),
  };

  const soundboardDomain = new SoundboardDomain(
    localSoundAdapter,
    myInstantSoundAdapter,
    userPreferenceAdapter
  );

  it('should get sounds', async () => {
    const soundLocal = new Sound(
      'localSound',
      'description',
      'file://lol',
      Source.LOCAL
    );
    const soundMyInstant = new Sound(
      'myInstantSound',
      'description',
      'https://lol',
      Source.MYINSTANT
    );
    localSoundAdapter.getSounds.mockReturnValueOnce([soundLocal]);
    myInstantSoundAdapter.getSounds.mockReturnValueOnce(
      Promise.resolve([soundMyInstant])
    );

    const sounds = await soundboardDomain.getSounds(new Filters(''));

    expect(sounds).toEqual([soundLocal, soundMyInstant]);
  });

  it('should get sounds with filter', async () => {
    const soundLocal = new Sound(
      'localSound',
      'description',
      'file://lol',
      Source.LOCAL
    );
    const soundLocal2 = new Sound(
      'toto',
      'description',
      'file://lol',
      Source.LOCAL
    );
    const soundMyInstant = new Sound(
      'myInstantSound',
      'description',
      'https://lol',
      Source.MYINSTANT
    );
    const soundMyInstant2 = new Sound(
      'tata',
      'description',
      'https://lol',
      Source.MYINSTANT
    );
    localSoundAdapter.getSounds.mockReturnValueOnce([soundLocal, soundLocal2]);
    myInstantSoundAdapter.getSounds.mockReturnValueOnce(
      Promise.resolve([soundMyInstant, soundMyInstant2])
    );

    const sounds = await soundboardDomain.getSounds(new Filters('sound'));

    expect(sounds).toEqual([soundLocal, soundMyInstant]);
  });
});
