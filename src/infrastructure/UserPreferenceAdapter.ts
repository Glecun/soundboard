import { app, remote } from 'electron';
import fs from 'fs';
import {
  AudioOutput,
  UserPreferences,
} from '../domain/entities/UserPreferences';

const path = require('path');

class UserPreferenceAdapter {
  path: string;

  userPreferences: UserPreferences;

  constructor() {
    const myApp = app || remote?.app;
    const userDataPath = myApp ? myApp.getPath('userData') : '';
    this.path = path.join(userDataPath, 'user-preferences.json');
    this.userPreferences = UserPreferenceAdapter.parseDataFile(this.path);
  }

  getUserPreferences() {
    return this.userPreferences;
  }

  set(userPreferences: UserPreferences) {
    this.userPreferences = userPreferences;
    fs.writeFileSync(this.path, JSON.stringify(this.userPreferences));
  }

  private static parseDataFile(filePath: string): UserPreferences {
    try {
      // @ts-ignore
      const json = JSON.parse(fs.readFileSync(filePath));
      return new UserPreferences(json.audioOutput, json.pathToSoundsJson);
    } catch (error) {
      return new UserPreferences(new AudioOutput('default', 'default'), './sounds.json');
    }
  }
}

export default UserPreferenceAdapter;
