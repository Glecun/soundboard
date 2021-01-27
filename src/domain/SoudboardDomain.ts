import {Sound} from "./entities/Sound";
import {SoundAdapter} from "../infrastructure/SoundAdapter";

const soundAdapter = new SoundAdapter();

export function getSounds() : Sound[] {
   return soundAdapter.getSounds();
}
