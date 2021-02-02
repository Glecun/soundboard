import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import soundboardDomain from '../../domain/SoundboardDomain';

const ChooseSoundsPath = () => {
  const [localSoundJsonPath, setLocalSoundJsonPath] = useState('');

  useEffect(() => {
    const userPreferences = soundboardDomain.getUserPreferences();
    setLocalSoundJsonPath(userPreferences.pathToSoundsJson);
  }, []);

  const fileSelected = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (file) {
      setLocalSoundJsonPath(file.path);
      soundboardDomain.setUserPreferences(
        soundboardDomain.getUserPreferences().setPathToSoundsJson(file.path)
      );
    }
  };

  return (
    <div className="choose-sounds-path">
      <div className="input-container">
        <span className="label">Choose sound.json path:</span>
        <input
          type="file"
          className="input-file"
          accept=".json"
          onChange={fileSelected}
        />
      </div>
      <span className="current-path">
        <span className="label">Current path: </span>
        {localSoundJsonPath}
      </span>
    </div>
  );
};

export default ChooseSoundsPath;
