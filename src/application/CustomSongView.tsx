import React, { useEffect, useState } from 'react';
import { FaMusic } from 'react-icons/all';
import { getSounds } from '../domain/SoudboardDomain';
import Sound from '../domain/entities/Sound';
import ChooseAudioOutput from './component/ChooseAudioOutput';
import SoundComponent from './component/SoundComponent';

const CustomSongView = () => {
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
        {sounds.map((sound) => (
          <SoundComponent key={sound.name} sound={sound} />
        ))}
      </div>
    </div>
  );
};

export default CustomSongView;
