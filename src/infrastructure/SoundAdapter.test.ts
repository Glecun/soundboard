import fs from 'fs';
import * as os from 'os';
import Sound from '../domain/entities/Sound';
import SoundAdapter from './SoundAdapter';

jest.mock('fs');
jest.mock('os');

describe('SoundAdapter', () => {
  const soundAdapter = new SoundAdapter();

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

    const sounds = soundAdapter.getSounds('./sounds.json');

    expect(sounds).toEqual([
      new Sound(
        'Le_gras_est_la_vie',
        'kaamelott',
        '/home/glecun/dev/workspace/soundboard/sounds/kaamelott/Le_gras_est_la_vie.mp3'
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

    const sounds = soundAdapter.getSounds('./sounds.json');

    expect(sounds).toEqual([
      new Sound('bien', 'warcraft', 'D:\\sounds\\warcraft\\bien.mp3'),
    ]);
  });
});
