import { toast } from 'react-toastify';
import { SoundFileJson, SoundJson } from './dto/SoundJson';
import Sound from '../domain/entities/Sound';

const fs = require('fs');

class SoundAdapter {
  getSounds(pathToSoundsJson: string): Sound[] {
    let rawData;
    try {
      rawData = fs.readFileSync(pathToSoundsJson);
    } catch (e) {
      toast.info(
        `Cannot read file ${pathToSoundsJson}, please set sounds.json in settings`
      );
    }

    const soundsJson: SoundFileJson = rawData
      ? SoundAdapter.parseJson(rawData)
      : new SoundFileJson([]);
    return soundsJson.soundboardEntries
      .map((soundJson) => SoundJson.fromSoundJson(soundJson))
      .map((soundJson) => soundJson.toSound());
  }

  private static parseJson(rawData: any): SoundFileJson {
    try {
      return JSON.parse(rawData);
    } catch (e) {
      toast.error(`Cannot parse json: ${rawData}`);
      return new SoundFileJson([]);
    }
  }
}

export default SoundAdapter;
