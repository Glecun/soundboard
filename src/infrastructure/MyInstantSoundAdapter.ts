import { toast } from 'react-toastify';
import { Response } from 'node-fetch';
import Sound from '../domain/entities/Sound';
import MyInstantSoundJson from './dto/MyInstantSoundJson';
import conf from '../../conf/conf.json';

const fetch = require('node-fetch');

class MyInstantSoundAdapter {
  async getSounds(search: string): Promise<Sound[]> {
    try {
      const searchParam =
        search != null && search.length >= 2
          ? `&search=${encodeURI(search)}`
          : '';
      return await fetch(
        `https://api.cleanvoice.ru/myinstants/?type=many&offset=0&limit=${conf.number_of_sound_in_list}${searchParam}`
      )
        .then((response: Response) => response.json())
        .then((dataJson: { items: MyInstantSoundJson[] }) =>
          dataJson.items
            .map((myInstantSoundJson) =>
              MyInstantSoundJson.fromMyInstantSoundJson(myInstantSoundJson)
            )
            .map((myInstantSoundJson) => myInstantSoundJson.toSound())
        );
    } catch (error) {
      toast.error('Cannot get myInstant Sounds');
    }
    return Promise.resolve([]);
  }

  async getOneRandomSound(): Promise<Sound[]> {
    try {
      return await fetch('https://api.cleanvoice.ru/myinstants/?type=single')
        .then((response: Response) => response.json())
        .then((myInstantSoundJson: MyInstantSoundJson) => [
          MyInstantSoundJson.fromMyInstantSoundJson(
            myInstantSoundJson
          ).toSound(),
        ]);
    } catch (error) {
      toast.error('Cannot get myInstant Sounds');
    }
    return Promise.resolve([]);
  }
}

export default MyInstantSoundAdapter;
