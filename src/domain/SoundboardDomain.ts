import { toast } from 'react-toastify';
import { UserPreferences } from './entities/UserPreferences';
import UserPreferenceAdapter from '../infrastructure/UserPreferenceAdapter';
import LocalSoundAdapter from '../infrastructure/LocalSoundAdapter';
import Sound from './entities/Sound';
import Player from './entities/Player';
import MyInstantSoundAdapter from '../infrastructure/MyInstantSoundAdapter';
import Filters from './entities/Filters';
import conf from '../../conf/conf.json';

export class SoundboardDomain {
  localSoundAdapter: LocalSoundAdapter;

  myInstantSoundAdapter: MyInstantSoundAdapter;

  userPreferenceAdapter: UserPreferenceAdapter;

  constructor(
    localSoundAdapter: LocalSoundAdapter,
    myInstantSoundAdapter: MyInstantSoundAdapter,
    userPreferenceAdapter: UserPreferenceAdapter
  ) {
    this.localSoundAdapter = localSoundAdapter;
    this.myInstantSoundAdapter = myInstantSoundAdapter;
    this.userPreferenceAdapter = userPreferenceAdapter;
  }

  async getSounds(filters: Filters): Promise<Sound[]> {
    const userPreferences = this.userPreferenceAdapter.getUserPreferences();
    const localSounds = this.localSoundAdapter.getSounds(
      userPreferences.pathToSoundsJson
    );
    const myInstantSounds = await this.myInstantSoundAdapter.getSounds(
      filters.search
    );
    return filters
      .applyFilters(localSounds.concat(myInstantSounds))
      .slice(0, conf.number_of_sound_in_list);
  }

  setUserPreferences(userPreferences: UserPreferences) {
    this.userPreferenceAdapter.set(userPreferences);
  }

  getUserPreferences(): UserPreferences {
    return this.userPreferenceAdapter.getUserPreferences();
  }

  async playRandomSound(): Promise<Player | null> {
    const oneSoundBySource = this.getOneRandomLocalSound().concat(
      await this.myInstantSoundAdapter.getOneRandomSound()
    );
    if (oneSoundBySource && oneSoundBySource.length > 0) {
      const audioOutput = this.getUserPreferences().audioOutput.id;
      const sound =
        oneSoundBySource[Math.floor(Math.random() * oneSoundBySource.length)];
      const player = new Player(sound, audioOutput);
      player.play();
      toast.info(`Random sound: ${sound.name}`);
      return player;
    }
    return null;
  }

  private getOneRandomLocalSound(): Sound[] {
    const userPreferences = this.userPreferenceAdapter.getUserPreferences();
    const localSounds = this.localSoundAdapter.getSounds(
      userPreferences.pathToSoundsJson
    );
    if (localSounds && localSounds.length > 0) {
      return [localSounds[Math.floor(Math.random() * localSounds.length)]];
    }
    return [];
  }
}

const soundboardDomain = new SoundboardDomain(
  new LocalSoundAdapter(),
  new MyInstantSoundAdapter(),
  new UserPreferenceAdapter()
);
Object.freeze(soundboardDomain);

export default soundboardDomain;
