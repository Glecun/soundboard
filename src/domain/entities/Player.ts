import {Sound} from "./Sound";

export class Player {
   player : HTMLAudioElement;

   constructor(sound: Sound) {
      this.player = new Audio('file://' + sound.path);
   }

   isPlaying() : boolean {
      return this.player
         && this.player.currentTime > 0
         && !this.player.paused
         && !this.player.ended
         && this.player.readyState > 2;
   }

   play()  {
      this.player.play().catch(e => alert('Error when playing sound : ' + e));
   }

   stop(){
      this.player.pause();
      this.player.currentTime = 0;
   }

}
