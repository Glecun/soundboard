import * as os from 'os';
import Sound from '../../domain/entities/Sound';
import Source from '../../domain/entities/Source';

export class LocalSoundFileJson {
  soundboardEntries: LocalSoundJson[];

  constructor(soundboardEntries: LocalSoundJson[]) {
    this.soundboardEntries = soundboardEntries;
  }
}

export class LocalSoundJson {
  activationKeysNumbers: number[];

  file: string;

  constructor(activationKeysNumbers: number[], file: string) {
    this.activationKeysNumbers = activationKeysNumbers;
    this.file = file;
  }

  static fromLocalSoundJson(soundJson: LocalSoundJson) {
    return new LocalSoundJson(soundJson.activationKeysNumbers, soundJson.file);
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
    return new Sound(name, author, `file://${this.file}`, Source.LOCAL);
  }
}
