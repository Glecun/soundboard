import { toast } from 'react-toastify';
import { LocalSoundFileJson, LocalSoundJson } from './dto/LocalSoundJson';
import Sound from '../domain/entities/Sound';

const fs = require('fs');

class LocalSoundAdapter {
  getSounds(pathToSoundsJson: string): Sound[] {
    let rawData;
    try {
      rawData = fs.readFileSync(pathToSoundsJson);
    } catch (e) {
      toast.info(
        `Cannot read file ${pathToSoundsJson}, please set sounds.json in settings`
      );
    }

    const localSoundsFileJson: LocalSoundFileJson = rawData
      ? LocalSoundAdapter.parseJson(rawData)
      : new LocalSoundFileJson([]);
    return localSoundsFileJson.soundboardEntries
      .map((localSoundJson) =>
        LocalSoundJson.fromLocalSoundJson(localSoundJson)
      )
      .map((localSoundJson) => localSoundJson.toSound());
  }

  addSound(pathToSoundsJson: string, soundPath: string) {
    try {
      const rawData = fs.readFileSync(pathToSoundsJson);
      const localSoundsFileJson = LocalSoundAdapter.parseJson(rawData);
      localSoundsFileJson.soundboardEntries.push(
        new LocalSoundJson([], soundPath)
      );
      fs.writeFileSync(pathToSoundsJson, JSON.stringify(localSoundsFileJson));
    } catch (e) {
      toast.info(`Cannot add file ${soundPath}`);
      console.log(e);
    }
  }

  removeSound(pathToSoundsJson: string, soundPath: string) {
    try {
      const rawData = fs.readFileSync(pathToSoundsJson);
      const localSoundsFileJson = LocalSoundAdapter.parseJson(rawData);
      localSoundsFileJson.soundboardEntries = localSoundsFileJson.soundboardEntries.filter(
        (sound) => !soundPath.includes(sound.file)
      );
      fs.writeFileSync(pathToSoundsJson, JSON.stringify(localSoundsFileJson));
    } catch (e) {
      toast.info(`Cannot remove file ${soundPath}`);
      console.log(e);
    }
  }

  private static parseJson(rawData: any): LocalSoundFileJson {
    try {
      return JSON.parse(rawData);
    } catch (e) {
      toast.error(`Cannot parse json: ${rawData}`);
      console.error(e);
      return new LocalSoundFileJson([]);
    }
  }
}

export default LocalSoundAdapter;
