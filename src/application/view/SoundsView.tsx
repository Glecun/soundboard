import React, { useEffect, useState } from 'react';
import Sound from '../../domain/entities/Sound';
import { getSounds } from '../../domain/SoudboardDomain';
import SoundComponent from '../component/SoundComponent';
import FilterComponent from '../component/FilterComponent';
import Filters from '../../domain/entities/Filters';

const SoundsView = () => {
  const [sounds, setSounds] = useState([] as Sound[]);
  const [filters, setfilters] = useState(new Filters(''));

  useEffect(() => setSounds(getSounds()), []);
  const onFilterUpdated = (newFilters: Filters) =>
    setfilters(Filters.fromFilters(newFilters));

  return (
    <div className="sounds-view animated fadeInRight">
      <FilterComponent sendFiltersToParent={onFilterUpdated} />
      <div className="sounds">
        {filters.applyFilters(sounds).map((sound) => (
          <SoundComponent key={Math.random()} sound={sound} />
        ))}
      </div>
    </div>
  );
};

export default SoundsView;
