import React, { useEffect, useState } from 'react';
import { getSounds } from '../domain/SoudboardDomain';
import { Sound } from '../domain/entities/Sound';
import { SoundComponent } from './component/SoundComponent';
import { FaMusic } from 'react-icons/all';
import { ChooseAudioOutput } from './component/ChooseAudioOutput';

export const CustomSongView = () => {
  const [sounds, setSounds] = useState([] as Sound[]);
  useEffect(() => setSounds(getSounds()), []);

  return (
    <div className="custom-songs-view">
      <ChooseAudioOutput />
      <span className="custom-songs">
        <FaMusic className="custom-songs-icon" />
        <span>Custom Songs</span>
      </span>
      <div className="sounds">
        {sounds.map((sound, i) => (
          <SoundComponent key={i} sound={sound} />
        ))}
      </div>
    </div>
  );
};
