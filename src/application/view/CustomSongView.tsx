import React, { useEffect, useState } from 'react';

import { FaMusic } from 'react-icons/fa/';
import Sound from '../../domain/entities/Sound';
import { getSounds } from '../../domain/SoudboardDomain';
import SoundComponent from '../component/SoundComponent';

const CustomSongView = () => {
  const [sounds, setSounds] = useState([] as Sound[]);
  useEffect(() => setSounds(getSounds()), []);

  return (
    <div className="custom-songs-view animated fadeInRight">
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
