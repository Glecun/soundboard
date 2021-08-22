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
    this.path = UserPreferenceAdapter.getFilePath('user-preferences.json');
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
      return new UserPreferences(
        new AudioOutput('default', 'default'),
        UserPreferenceAdapter.getOrCreateEmptySoundsListFile()
      );
    }
  }

  private static getOrCreateEmptySoundsListFile(): string {
    const filePath = UserPreferenceAdapter.getFilePath('sounds.json');
    if (!fs.existsSync(filePath)) {
      const defaultSoundPath = app?.isPackaged
        ? path.join(process.resourcesPath, 'assets', 'oof.mp3')
        : path.join(__dirname, '../assets', 'oof.mp3');
      fs.writeFileSync(
        filePath,
        `{"soundboardEntries": [{"file": "${defaultSoundPath}"}]}`
      );
    }
    return filePath;
  }

  private static getFilePath(name: string): string {
    const myApp = app || remote?.app;
    const userDataPath = myApp ? myApp.getPath('userData') : '';
    return path.join(userDataPath, name);
  }
}

export default UserPreferenceAdapter;
