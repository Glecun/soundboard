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
      items: [
        {
          id: 1,
          filename: 'risada_carlos_alberto_mp3cut.mp3',
          title: 'Risada Carlos Alberto Nobrega',
          duration: '4.20563',
        },
      ],
    };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(json))
    );

    const sounds = await myInstantSoundAdapter.getSounds('Ris');
    expect(sounds).toEqual([
      new Sound(
        'Risada Carlos Alberto Nobrega',
        '',
        'https://api.cleanvoice.ru/myinstants/?type=file&id=1',
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

  it('should get one sound randomly', async () => {
    const json = {
      id: 1,
      filename: 'risada_carlos_alberto_mp3cut.mp3',
      title: 'Risada Carlos Alberto Nobrega',
      duration: '4.20563',
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(json))
    );

    const sounds = await myInstantSoundAdapter.getOneRandomSound();

    expect(sounds).toEqual([
      new Sound(
        'Risada Carlos Alberto Nobrega',
        '',
        'https://api.cleanvoice.ru/myinstants/?type=file&id=1',
        Source.MYINSTANT
      ),
    ]);
  });

  it('should not get sounds when search input has not at least 3 letters', async () => {
    const sounds = await myInstantSoundAdapter.getSounds('Ri');
    expect(sounds).toEqual([]);
  });
});
