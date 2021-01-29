export class UserPreferences {
  audioOutput: AudioOutput;

  constructor(audioOutput: AudioOutput) {
    this.audioOutput = audioOutput;
  }

  setAudioOutput(audioOutput: AudioOutput): UserPreferences {
    return new UserPreferences(audioOutput);
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
