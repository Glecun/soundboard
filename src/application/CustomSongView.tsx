import React, {useEffect, useState} from "react";
import {getSounds} from "../domain/SoudboardDomain";
import {Sound} from "../domain/entities/Sound";
import {SoundComponent} from "./component/SoundComponent";
// @ts-ignore
import styles from "./CustomSongView.css";
import {FaMusic} from "react-icons/all";


export const CustomSongView = () => {

   const [sounds, setSounds] = useState([] as Sound[]);

   useEffect(() => setSounds(getSounds()), [])

   return (
      <div>
         <span className={styles.custom_songs}>
            <FaMusic className={styles.custom_songs_icon}/><span>Custom Songs</span>
         </span>
         <div className={styles.sounds}>
            {sounds.map((sound, i) => <SoundComponent key={i} sound={sound}/>)}
         </div>
      </div>
   );
};
