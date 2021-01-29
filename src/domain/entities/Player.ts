import Sound from './Sound';

class Player {
  player: HTMLAudioElement;

  constructor(sound: Sound, audioOutputDeviceId: string) {
    this.player = new Audio(`file://${sound.path}`) as HTMLAudioElement;
    if (audioOutputDeviceId !== 'default') {
      this.player
        .setSinkId(audioOutputDeviceId)
        .then(
          () => true,
          (e: any) => alert(`Error when setting sinkId: ${e}`)
        )
        .catch((e: any) => alert(`Cannot set sinkId: ${e}`));
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
    this.player.play().catch((e) => alert(`Error when playing sound : ${e}`));
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }
}

export default Player;
