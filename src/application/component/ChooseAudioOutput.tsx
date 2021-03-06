import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import {
  AudioOutput,
  UserPreferences,
} from '../../domain/entities/UserPreferences';
import soundboardDomain from '../../domain/SoundboardDomain';

class OptionsDevice {
  value: MediaDeviceInfo;

  label: string;

  constructor(value: MediaDeviceInfo, label: string) {
    this.value = value;
    this.label = label;
  }

  static fromMediaDeviceInfo(device: MediaDeviceInfo): OptionsDevice {
    return new OptionsDevice(device, device.label);
  }

  static fromUserPreferences(userPreference: UserPreferences): OptionsDevice {
    return new OptionsDevice(
      {
        deviceId: userPreference.audioOutput.id,
        label: userPreference.audioOutput.name,
      } as MediaDeviceInfo,
      userPreference.audioOutput.name
    );
  }

  toAudioOutput(): AudioOutput {
    return new AudioOutput(this.value.deviceId, this.value.label);
  }
}

const ChooseAudioOutput = () => {
  const [optionsDevices, setOptionsDevices] = useState([] as OptionsDevice[]);
  const [selectedOption, setSelectedOption] = useState(
    new OptionsDevice(
      { label: 'Default', deviceId: 'default' } as MediaDeviceInfo,
      'Default'
    )
  );

  useEffect(() => {
    navigator?.mediaDevices
      ?.enumerateDevices()
      .then((devices) => {
        const optionsDevicesResult = devices
          .filter((device) => device.kind === 'audiooutput')
          .map((device) => OptionsDevice.fromMediaDeviceInfo(device));
        const userPreferences = soundboardDomain.getUserPreferences();
        setSelectedOption(OptionsDevice.fromUserPreferences(userPreferences));
        setOptionsDevices(optionsDevicesResult);
        return true;
      })
      .catch((reason) => toast.error(`Cannot enumerate devices ${reason}`));
  }, []);

  const onSelect = (selectedOptionValue: OptionsDevice) => {
    setSelectedOption(selectedOptionValue);
    soundboardDomain.setUserPreferences(
      soundboardDomain
        .getUserPreferences()
        .setAudioOutput(selectedOptionValue.toAudioOutput())
    );
  };

  const customStyles = {
    option: (base: any, state: any) => ({
      ...base,
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#2d2d2d',
      fontWeight: state.isSelected ? 'bold' : 'normal',
      '&:hover': {
        backgroundColor: '#3e3e3e',
      },
    }),
    control: (base: any) => ({
      ...base,
      backgroundColor: '#2d2d2d',
      borderColor: '#e0e0e0 !important',
      boxShadow: 'none',
      minWidth: '260px',
      width: '45vw',
      marginLeft: '12px',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#e0e0e0',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#2d2d2d',
      border: '1px solid #e0e0e0',
    }),
  };

  return (
    <div className="choose-audio-output">
      <span className="label">Choose audio output:</span>
      <Select
        styles={customStyles}
        value={selectedOption}
        onChange={(value: any, _: any) => onSelect(value as OptionsDevice)}
        options={optionsDevices}
      />
    </div>
  );
};

export default ChooseAudioOutput;
