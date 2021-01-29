import conf from '../conf/conf.json';
import { Sound } from '../domain/entities/Sound';
import { recreateSoundJson, SoundFileJson } from './dto/SoundJson';

export class SoundAdapter {
  constructor() {}

  getSounds(): Sound[] {
    const fs = require('fs');
    let rawdata = fs.readFileSync(conf.path_to_sounds_json);
    const soundsJson: SoundFileJson = JSON.parse(rawdata);
    return soundsJson.soundboardEntries
      .map((soundJson) => recreateSoundJson(soundJson))
      .map((soundJson) => soundJson.toSound());
  }
}
