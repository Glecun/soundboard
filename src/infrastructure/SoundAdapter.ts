import conf from '../conf/conf.json';
import { recreateSoundJson, SoundFileJson } from './dto/SoundJson';
import Sound from '../domain/entities/Sound';

const fs = require('fs');

class SoundAdapter {
  getSounds(): Sound[] {
    const rawdata = fs.readFileSync(conf.path_to_sounds_json);
    const soundsJson: SoundFileJson = JSON.parse(rawdata);
    return soundsJson.soundboardEntries
      .map((soundJson) => recreateSoundJson(soundJson))
      .map((soundJson) => soundJson.toSound());
  }
}

export default SoundAdapter;
