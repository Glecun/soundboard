import {Sound} from "./entities/Sound";
import {SoundAdapter} from "../infrastructure/SoundAdapter";
import {UserPreferenceAdapter} from "../infrastructure/UserPreferenceAdapter";
import {UserPreferences} from "./entities/UserPreferences";

const soundAdapter = new SoundAdapter();
const userPreferenceAdapter = new UserPreferenceAdapter();

export function getSounds() : Sound[] {
   return soundAdapter.getSounds();
}

export function setUserPreferences(userPreferences: UserPreferences)  {
   userPreferenceAdapter.set(userPreferences);
}

export function getUserPreferences() : UserPreferences {
   return userPreferenceAdapter.getUserPreferences();
}
