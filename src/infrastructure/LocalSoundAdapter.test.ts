import fs from 'fs';
import * as os from 'os';
import Sound from '../domain/entities/Sound';
import LocalSoundAdapter from './LocalSoundAdapter';
import Source from '../domain/entities/Source';

jest.mock('fs');
jest.mock('os');

describe('LocalSoundAdapter', () => {
  const localSoundAdapter = new LocalSoundAdapter();

  it('should get sounds with linux path', () => {
    const soundsJsonMock = {
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
    jest.spyOn(os, 'platform').mockReturnValueOnce('linux');

    const sounds = localSoundAdapter.getSounds('./sounds.json');

    expect(sounds).toEqual([
      new Sound(
        'Le_gras_est_la_vie',
        'kaamelott',
        'file:///home/glecun/dev/workspace/soundboard/sounds/kaamelott/Le_gras_est_la_vie.mp3',
        Source.LOCAL
      ),
    ]);
  });

  it('should get sounds with windows path', () => {
    const soundsJsonMock = {
      soundboardEntries: [
        {
          file: 'D:\\sounds\\warcraft\\bien.mp3',
          activationKeysNumbers: [96, 97],
        },
      ],
    };
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(JSON.stringify(soundsJsonMock));
    jest.spyOn(os, 'platform').mockReturnValueOnce('win32');

    const sounds = localSoundAdapter.getSounds('./sounds.json');

    expect(sounds).toEqual([
      new Sound(
        'bien',
        'warcraft',
        'file://D:\\sounds\\warcraft\\bien.mp3',
        Source.LOCAL
      ),
    ]);
  });
});
