import React, { useEffect, useState } from 'react';

import { FaMusic } from 'react-icons/fa/';
import Sound from '../../domain/entities/Sound';
import { getSounds } from '../../domain/SoudboardDomain';
import SoundComponent from '../component/SoundComponent';

const SoundsView = () => {
  const [sounds, setSounds] = useState([] as Sound[]);
  useEffect(() => setSounds(getSounds()), []);

  return (
    <div className="sounds-view animated fadeInRight">
      <span className="title">
        <FaMusic className="title-icon" />
        <span>Sounds</span>
      </span>
      <div className="sounds">
        {sounds.map((sound) => (
          <SoundComponent key={sound.name} sound={sound} />
        ))}
      </div>
    </div>
  );
};

export default SoundsView;
