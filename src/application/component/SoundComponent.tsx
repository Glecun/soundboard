import React, {useState} from "react";
import {Sound} from "../../domain/entities/Sound";
// @ts-ignore
import styles from './SoundComponent.css';
import {FaPlay, FaStop} from "react-icons/all";
import {Player} from "../../domain/entities/Player";

export const SoundComponent = (props: {sound : Sound}) => {

   const [player] = useState(new Player(props.sound));
   const [isPlaying, setIsPlaying] = useState(false);

   const play = () => {
      player.play();
      setIsPlaying(true);
      player.player.addEventListener("ended", () => setIsPlaying(false))
   }

   const stop = () => {
      player.stop();
      setIsPlaying(false);
   }

   return (
      <div className={styles.sound}>
         <div className={styles.play_container}>
            {!isPlaying ?
               <FaPlay onClick={() => play()}/> :
               <FaStop onClick={() => stop()}/>
            }
         </div>
         <div className={styles.name_author_container}>
            <span>{props.sound.name}</span>
            <span className={styles.author}>{props.sound.author}</span>
         </div>
      </div>
      );
}
