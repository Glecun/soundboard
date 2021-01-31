import * as os from 'os';
import Sound from '../../domain/entities/Sound';

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

  static fromSoundJson(soundJson: SoundJson) {
    return new SoundJson(soundJson.activationKeysNumbers, soundJson.file);
  }

  toSound(): Sound {
    let nameExtracted: RegExpMatchArray | null;
    let authorExtracted: RegExpMatchArray | null;
    if (os.platform() === 'win32') {
      nameExtracted = /.*\\(.*)\..*$/.exec(this.file);
      authorExtracted = /.*\\(.*)\\.*$/.exec(this.file);
    } else {
      nameExtracted = /.*\/(.*)\..*$/.exec(this.file);
      authorExtracted = /.*\/(.*)\/.*$/.exec(this.file);
    }
    const name = nameExtracted ? nameExtracted[1] : '';
    const author = authorExtracted ? authorExtracted[1] : '';
    return new Sound(name, author, this.file);
  }
}
