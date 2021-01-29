import { SoundJson } from './SoundJson';
import Sound from "../../domain/entities/Sound";


describe('SoundJson', () => {
  it('should convert SoundJson to Sound', () => {
    const soundJson = new SoundJson([], '/home/lol.mp3');
    expect(soundJson.toSound()).toEqual(
      new Sound('lol', 'home', '/home/lol.mp3')
    );
  });
});
