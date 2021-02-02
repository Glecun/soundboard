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

  private static parseJson(rawData: any): LocalSoundFileJson {
    try {
      return JSON.parse(rawData);
    } catch (e) {
      toast.error(`Cannot parse json: ${rawData}`);
      return new LocalSoundFileJson([]);
    }
  }
}

export default LocalSoundAdapter;
