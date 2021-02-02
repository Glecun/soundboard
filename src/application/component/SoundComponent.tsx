import React, { useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import Sound from '../../domain/entities/Sound';
import Player from '../../domain/entities/Player';
import soundboardDomain from '../../domain/SoundboardDomain';

const SoundComponent = ({
  sound,
  registerSound,
}: {
  sound: Sound;
  registerSound: (stopSound: () => void) => void;
}) => {
  const [player] = useState(
    new Player(sound, soundboardDomain.getUserPreferences().audioOutput.id)
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = () => {
    player.stop();
    setIsPlaying(false);
  };

  const play = () => {
    player.play();
    registerSound(stop);
    setIsPlaying(true);
    player.player?.addEventListener('ended', () => setIsPlaying(false));
  };

  return (
    <div className="sound-component animated fadeInRight">
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
