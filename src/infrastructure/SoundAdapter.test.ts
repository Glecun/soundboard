import fs from 'fs';
import { Sound } from '../domain/entities/Sound';
import { SoundAdapter } from './SoundAdapter';

jest.mock('fs');

describe('SoundAdapter', () => {
  const soundAdapter = new SoundAdapter();

  it('should get sounds', () => {
    let soundsJsonMock = {
      soundboardEntries: [
        {
          file:
            '/home/glecun/dev/workspace/soundboard/sounds/kaamelott/Le_gras_est_la_vie.mp3',
          activationKeysNumbers: [49, 97],
        },
      ],
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(JSON.stringify(soundsJsonMock));

    const sounds = soundAdapter.getSounds();

    expect(sounds).toEqual([
      new Sound(
        'Le_gras_est_la_vie',
        'kaamelott',
        '/home/glecun/dev/workspace/soundboard/sounds/kaamelott/Le_gras_est_la_vie.mp3'
      ),
    ]);
  });
});
