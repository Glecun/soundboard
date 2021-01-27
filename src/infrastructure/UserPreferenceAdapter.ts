import {AudioOutput, UserPreferences} from "../domain/entities/UserPreferences";
import {app, remote} from 'electron';
import fs from "fs";

const path = require('path');


export class UserPreferenceAdapter {

   path: any;
   userPreferences: UserPreferences;

   constructor() {
      const userDataPath = (app || remote.app).getPath('userData');
      this.path = path.join(userDataPath, 'user-preferences.json');
      this.userPreferences = UserPreferenceAdapter.parseDataFile(this.path);
   }

   getUserPreferences() {
      return this.userPreferences;
   }

   set(userPreferences : UserPreferences) {
      this.userPreferences = userPreferences;
      fs.writeFileSync(this.path, JSON.stringify(this.userPreferences));
   }

   private static parseDataFile(filePath:string) : UserPreferences {
      try {
         // @ts-ignore
         const json = JSON.parse(fs.readFileSync(filePath));
         return new UserPreferences(json.audioOutput);
      } catch(error) {
         return new UserPreferences(new AudioOutput("default", "default"));
      }
   }
}

