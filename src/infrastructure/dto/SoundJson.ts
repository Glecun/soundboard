import { Sound } from '../../domain/entities/Sound';

export class SoundFileJson {
  soundboardEntries: SoundJson[];

  constructor(soundboardEntries: SoundJson[]) {
    this.soundboardEntries = soundboardEntries;
  }
}

export class SoundJson {
  activationKeysNumbers: number[];
  file: string;

  constructor(activationKeysNumbers: number[], file: string) {
    this.activationKeysNumbers = activationKeysNumbers;
    this.file = file;
  }

  toSound(): Sound {
    const nameExtracted = /.*\/(.*)\..*$/.exec(this.file);
    const name = nameExtracted ? nameExtracted[1] : '';
    const authorExtracted = /.*\/(.*)\/.*$/.exec(this.file);
    const author = authorExtracted ? authorExtracted[1] : '';
    return new Sound(name, author, this.file);
  }
}

export function recreateSoundJson(soundJson: SoundJson) {
  return new SoundJson(soundJson.activationKeysNumbers, soundJson.file);
}
