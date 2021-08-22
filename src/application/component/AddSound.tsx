import React, { BaseSyntheticEvent } from 'react';
import soundboardDomain from '../../domain/SoundboardDomain';

const AddSound = ({ reloadSounds }: { reloadSounds: () => void }) => {
  const soundSelected = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (file) {
      soundboardDomain.addSound(file.path);
      reloadSounds();
    }
  };

  return (
    <input
      type="file"
      className="add-sound"
      accept="audio/*"
      onChange={soundSelected}
    />
  );
};

export default AddSound;
