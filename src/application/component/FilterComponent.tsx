import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Filters from '../../domain/entities/Filters';

const FilterComponent = ({
  sendFiltersToParent,
}: {
  sendFiltersToParent: (filters: Filters) => void;
}) => {
  const [search, setSearch] = useState('');

  const onChange = (event: any) => {
    setSearch(event.target.value);
    sendFiltersToParent(new Filters(event.target.value));
  };
  return (
    <div className="filters-component">
      <FaSearch className="search-icon" />
      <input
        className="input-search"
        placeholder="Recherche..."
        value={search}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterComponent;
