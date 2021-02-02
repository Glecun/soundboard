import { UserPreferences } from './entities/UserPreferences';
import UserPreferenceAdapter from '../infrastructure/UserPreferenceAdapter';
import SoundAdapter from '../infrastructure/SoundAdapter';
import Sound from './entities/Sound';
import Player from './entities/Player';

const soundAdapter = new SoundAdapter();
const userPreferenceAdapter = new UserPreferenceAdapter();

export function getSounds(): Sound[] {
  const userPreferences = userPreferenceAdapter.getUserPreferences();
  return soundAdapter.getSounds(userPreferences.pathToSoundsJson);
}

export function setUserPreferences(userPreferences: UserPreferences) {
  userPreferenceAdapter.set(userPreferences);
}

export function getUserPreferences(): UserPreferences {
  return userPreferenceAdapter.getUserPreferences();
}

export function playRandomSound() {
  const soundsList = getSounds();
  if (soundsList && soundsList.length > 0) {
    const audioOutput = getUserPreferences().audioOutput.id;
    const player = new Player(
      soundsList[Math.floor(Math.random() * soundsList.length)],
      audioOutput
    );
    player.play();
  }
}
