import React, { useState } from 'react';
import { Sound } from '../../domain/entities/Sound';
import { FaPlay, FaStop } from 'react-icons/all';
import { Player } from '../../domain/entities/Player';
import { getUserPreferences } from '../../domain/SoudboardDomain';

export const SoundComponent = (props: { sound: Sound }) => {
  const [player] = useState(
    new Player(props.sound, getUserPreferences().audioOutput.id)
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
      <div className="play-container">
        {!isPlaying ? (
          <FaPlay onClick={() => play()} />
        ) : (
          <FaStop onClick={() => stop()} />
        )}
      </div>
      <div className="name-author-container">
        <span>{props.sound.name}</span>
        <span className="author">{props.sound.author}</span>
      </div>
    </div>
  );
};
