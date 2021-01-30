import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import ChooseAudioOutput from '../component/ChooseAudioOutput';

const SettingsView = () => {
  return (
    <div className="settings-view animated fadeInRight">
      <Link className="button" to="/">
        <FaRegArrowAltCircleLeft className="icon" />
      </Link>
      <ChooseAudioOutput />
    </div>
  );
};

export default SettingsView;
