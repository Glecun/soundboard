import React from "react";
import {Sound} from "../../domain/entities/Sound";
// @ts-ignore
import styles from './SoundComponent.css'

export const SoundComponent = (props: {sound : Sound}) => {
   return (
      <div className={styles.sound}>
         <span>{props.sound.name}</span>
         <span className={styles.author}>{props.sound.author}</span>
      </div>
      );
}
