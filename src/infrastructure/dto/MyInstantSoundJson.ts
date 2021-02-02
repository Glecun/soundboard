import Sound from '../../domain/entities/Sound';
import Source from '../../domain/entities/Source';

class MyInstantSoundJson {
  id: number;

  filename: string;

  title: string;

  duration: string;

  constructor(id: number, filename: string, title: string, duration: string) {
    this.id = id;
    this.filename = filename;
    this.title = title;
    this.duration = duration;
  }

  static fromMyInstantSoundJson(myInstantSoundJson: MyInstantSoundJson) {
    return new MyInstantSoundJson(
      myInstantSoundJson.id,
      myInstantSoundJson.filename,
      myInstantSoundJson.title,
      myInstantSoundJson.duration
    );
  }

  toSound(): Sound {
    return new Sound(
      this.title,
      '',
      `https://api.cleanvoice.ru/myinstants/?type=file&id=${this.id}`,
      Source.MYINSTANT
    );
  }
}

export default MyInstantSoundJson;
