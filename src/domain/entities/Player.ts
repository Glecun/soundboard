import { toast } from 'react-toastify';
import Sound from './Sound';

class Player {
  player: HTMLAudioElement;

  constructor(sound: Sound, audioOutputDeviceId: string) {
    this.player = new Audio(`file://${sound.path}`) as HTMLAudioElement;
    if (audioOutputDeviceId !== 'default') {
      this.player
        // @ts-ignore
        .setSinkId(audioOutputDeviceId)
        .then(
          () => true,
          (e: any) => toast.error(`Error when setting sinkId: ${e}`)
        )
        .catch((e: any) => toast.error(`Cannot set sinkId: ${e}`));
    }
  }

  isPlaying(): boolean {
    return (
      this.player &&
      this.player.currentTime > 0 &&
      !this.player.paused &&
      !this.player.ended &&
      this.player.readyState > 2
    );
  }

  play() {
    this.player
      .play()
      .catch((e) => toast.error(`Error when playing sound : ${e}`));
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }
}

export default Player;
