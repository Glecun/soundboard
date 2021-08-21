import React, { useEffect, useState } from 'react';
import { FaStop } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Sound from '../../domain/entities/Sound';
import SoundComponent from '../component/SoundComponent';
import FilterComponent from '../component/FilterComponent';
import Filters from '../../domain/entities/Filters';
import soundboardDomain from '../../domain/SoundboardDomain';

const SoundsView = ({
  stopAllSounds,
  registerSound,
}: {
  stopAllSounds: (() => void)[];
  registerSound: (stopSound: () => void) => void;
}) => {
  const [sounds, setSounds] = useState([] as Sound[]);
  const [filters, setFilters] = useState(new Filters(''));

  useEffect(() => {
    soundboardDomain
      .getSounds(filters)
      .then((filteredSounds: Sound[]) => setSounds(filteredSounds))
      .catch((e) => {
        console.error(e);
        toast.error('Cannot get sounds');
      });
  }, [filters]);
  const onFilterUpdated = (newFilters: Filters) =>
    setFilters(Filters.fromFilters(newFilters));
  const stopAll = () => stopAllSounds.forEach((stopSound) => stopSound());

  return (
    <div className="sounds-view animated fadeInRight">
      <div className="actions">
        <FilterComponent sendFiltersToParent={onFilterUpdated} />
        <button className="button-stop-all" onClick={stopAll} type="button">
          <FaStop className="icon-stop-all" />
        </button>
      </div>

      <div className="sounds">
        {sounds.map((sound) => (
          <SoundComponent
            key={sound.name}
            sound={sound}
            registerSound={registerSound}
          />
        ))}
      </div>
    </div>
  );
};

export default SoundsView;
