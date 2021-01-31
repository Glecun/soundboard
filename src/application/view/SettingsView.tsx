import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import ChooseAudioOutput from '../component/ChooseAudioOutput';
import ChooseSoundsPath from '../component/ChooseSoundsPath';

const SettingsView = () => {
  return (
    <div className="settings-view animated fadeInRight">
      <Link className="button" to="/">
        <FaRegArrowAltCircleLeft className="icon" />
      </Link>
      <ChooseAudioOutput />
      <ChooseSoundsPath />
    </div>
  );
};

export default SettingsView;
