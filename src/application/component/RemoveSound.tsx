import React from 'react';
import { FaTrash } from 'react-icons/fa';
import soundboardDomain from '../../domain/SoundboardDomain';
import Sound from '../../domain/entities/Sound';

const RemoveSound = ({
  sound,
  reloadSounds,
}: {
  sound: Sound;
  reloadSounds: () => void;
}) => {
  const removeSound = () => {
    soundboardDomain.removeSound(sound);
    reloadSounds();
  };
  return <FaTrash className="trash-icon" onClick={removeSound} />;
};

export default RemoveSound;
