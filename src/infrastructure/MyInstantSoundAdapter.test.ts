import fetch from 'node-fetch';
import MyInstantSoundAdapter from './MyInstantSoundAdapter';
import Sound from '../domain/entities/Sound';

import Source from '../domain/entities/Source';

const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch', () => jest.fn());

describe('MyInstantSoundAdapterTest', () => {
  const myInstantSoundAdapter = new MyInstantSoundAdapter();

  it('should get sounds', async () => {
    const json = {
      results: [
        {
          name: 'biggest oof of oofers',
          slug: 'biggest-oof-of-oofers-66740',
          sound:
            'http://www.myinstants.com/media/sounds/mario-64-oof-sound-effect-0s-0.mp3',
          color: 'FF00EE',
          image: null,
          description: 'oof',
          tags: '',
        },
      ],
    };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(json))
    );

    const sounds = await myInstantSoundAdapter.getSounds('Ris');
    expect(sounds).toEqual([
      new Sound(
        'biggest oof of oofers',
        'oof',
        'http://www.myinstants.com/media/sounds/mario-64-oof-sound-effect-0s-0.mp3',
        Source.MYINSTANT
      ),
    ]);
  });

  it('should not get sounds if API error', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('some error')
    );

    const sounds = await myInstantSoundAdapter.getSounds('Ris');

    expect(sounds).toEqual([]);
  });

  it('should not get sounds when search input has not at least 3 letters', async () => {
    const sounds = await myInstantSoundAdapter.getSounds('Ri');
    expect(sounds).toEqual([]);
  });
});
