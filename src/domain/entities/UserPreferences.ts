export class UserPreferences {
  audioOutput: AudioOutput;

  pathToSoundsJson: string;

  constructor(audioOutput: AudioOutput, pathToSoundsJson: string) {
    this.audioOutput = audioOutput;
    this.pathToSoundsJson = pathToSoundsJson;
  }

  setAudioOutput(audioOutput: AudioOutput): UserPreferences {
    return new UserPreferences(audioOutput, this.pathToSoundsJson);
  }

  setPathToSoundsJson(pathToSoundsJson: string): UserPreferences {
    return new UserPreferences(this.audioOutput, pathToSoundsJson);
  }
}

export class AudioOutput {
  id: string;

  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
