import { toast } from 'react-toastify';
import { Response } from 'node-fetch';
import Sound from '../domain/entities/Sound';
import MyInstantSoundJson from './dto/MyInstantSoundJson';

const fetch = require('node-fetch');

class MyInstantSoundAdapter {
  async getSounds(search: string): Promise<Sound[]> {
    try {
      if (search != null && search.length >= 2) {
        return await fetch(
          `https://www.myinstants.com/api/v1/instants/?name=${encodeURI(
            search
          )}&format=json`
        )
          .then((response: Response) => response.json())
          .then((dataJson: { results: MyInstantSoundJson[] }) =>
            dataJson.results
              .map((myInstantSoundJson) =>
                MyInstantSoundJson.fromMyInstantSoundJson(myInstantSoundJson)
              )
              .map((myInstantSoundJson) => myInstantSoundJson.toSound())
          );
      }
    } catch (error) {
      toast.error('Cannot get myInstant Sounds');
      console.error(error);
    }
    return Promise.resolve([]);
  }
}

export default MyInstantSoundAdapter;
