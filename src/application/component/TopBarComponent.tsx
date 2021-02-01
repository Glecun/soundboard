import * as React from 'react';
import { FaMinus, FaTimes, FaWindowMaximize } from 'react-icons/fa';

const BrowserWindow = require('electron').remote?.BrowserWindow;

const TopBarComponent = () => {
  const minimize = () => {
    const window = BrowserWindow.getFocusedWindow();
    window?.minimize();
  };
  const maximize = () => {
    const window = BrowserWindow.getFocusedWindow();
    if (window?.isMaximized()) {
      window?.unmaximize();
    } else {
      window?.maximize();
    }
  };
  const closeWidow = () => {
    const window = BrowserWindow.getFocusedWindow();
    window?.close();
  };

  return (
    <div className="top-bar-component">
      <button onClick={() => minimize()} className="min-btn" type="button">
        <FaMinus />
      </button>
      <button onClick={() => maximize()} className="max-btn" type="button">
        <FaWindowMaximize />
      </button>
      <button onClick={() => closeWidow()} className="close-btn" type="button">
        <FaTimes />
      </button>
    </div>
  );
};

export default TopBarComponent;
