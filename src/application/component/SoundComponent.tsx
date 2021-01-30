import React, { useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { getUserPreferences } from '../../domain/SoudboardDomain';
import Sound from '../../domain/entities/Sound';
import Player from '../../domain/entities/Player';

const SoundComponent = ({ sound }: { sound: Sound }) => {
  const [player] = useState(
    new Player(sound, getUserPreferences().audioOutput.id)
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    player.play();
    setIsPlaying(true);
    player.player.addEventListener('ended', () => setIsPlaying(false));
  };

  const stop = () => {
    player.stop();
    setIsPlaying(false);
  };

  return (
    <div className="sound-component">
      <div className="action-container">
        {!isPlaying ? (
          <FaPlay onClick={() => play()} />
        ) : (
          <FaStop className="stop" onClick={() => stop()} />
        )}
      </div>
      <div className="name-author-container">
        <span>{sound.name}</span>
        <span className="author">{sound.author}</span>
      </div>
    </div>
  );
};

export default SoundComponent;
