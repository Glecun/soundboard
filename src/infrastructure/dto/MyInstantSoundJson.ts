import Sound from '../../domain/entities/Sound';
import Source from '../../domain/entities/Source';

class MyInstantSoundJson {
  name: string;

  sound: string;

  description: string;

  constructor(name: string, sound: string, description: string) {
    this.name = name;
    this.sound = sound;
    this.description = description;
  }

  static fromMyInstantSoundJson(myInstantSoundJson: MyInstantSoundJson) {
    return new MyInstantSoundJson(
      myInstantSoundJson.name,
      myInstantSoundJson.sound,
      myInstantSoundJson.description
    );
  }

  toSound(): Sound {
    return new Sound(this.name, this.description, this.sound, Source.MYINSTANT);
  }
}

export default MyInstantSoundJson;
