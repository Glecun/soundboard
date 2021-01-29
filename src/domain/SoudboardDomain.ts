import { UserPreferences } from './entities/UserPreferences';
import UserPreferenceAdapter from '../infrastructure/UserPreferenceAdapter';
import SoundAdapter from '../infrastructure/SoundAdapter';
import Sound from './entities/Sound';

const soundAdapter = new SoundAdapter();
const userPreferenceAdapter = new UserPreferenceAdapter();

export function getSounds(): Sound[] {
  return soundAdapter.getSounds();
}

export function setUserPreferences(userPreferences: UserPreferences) {
  userPreferenceAdapter.set(userPreferences);
}

export function getUserPreferences(): UserPreferences {
  return userPreferenceAdapter.getUserPreferences();
}
