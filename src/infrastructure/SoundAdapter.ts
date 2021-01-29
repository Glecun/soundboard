import conf from '../conf/conf.json';
import { recreateSoundJson, SoundFileJson } from './dto/SoundJson';
import Sound from '../domain/entities/Sound';

const fs = require('fs');

class SoundAdapter {
  getSounds(): Sound[] {
    let rawdata;
    try {
      rawdata = fs.readFileSync(conf.path_to_sounds_json);
    } catch (e) {
      alert(`Cannot read file ${conf.path_to_sounds_json}, error: ${e}`);
    }

    const soundsJson: SoundFileJson = rawdata
      ? JSON.parse(rawdata)
      : new SoundFileJson([]);
    return soundsJson.soundboardEntries
      .map((soundJson) => recreateSoundJson(soundJson))
      .map((soundJson) => soundJson.toSound());
  }
}

export default SoundAdapter;
