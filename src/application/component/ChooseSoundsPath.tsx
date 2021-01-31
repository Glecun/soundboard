import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
  getUserPreferences,
  setUserPreferences,
} from '../../domain/SoudboardDomain';

const ChooseSoundsPath = () => {
  const [soundJsonPath, setSoundJsonPath] = useState('');

  useEffect(() => {
    const userPreferences = getUserPreferences();
    setSoundJsonPath(userPreferences.pathToSoundsJson);
  }, []);

  const fileSelected = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (file) {
      setSoundJsonPath(file.path);
      setUserPreferences(getUserPreferences().setPathToSoundsJson(file.path));
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
        {soundJsonPath}
      </span>
    </div>
  );
};

export default ChooseSoundsPath;
