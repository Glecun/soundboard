import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.global.css';
import { FaCog, FaRegKeyboard } from 'react-icons/fa/';
import { useState } from 'react';
import SoundsView from './application/view/SoundsView';
import SettingsView from './application/view/SettingsView';

export default function App() {
  const [stopAllSounds, setStopAllSounds] = useState([] as (() => void)[]);
  const registerSound = (stopSound: () => void) =>
    setStopAllSounds(stopAllSounds.concat(stopSound));

  return (
    <Router>
      <div className="app-view">
        <div className="menu">
          <span className="title">
            <FaRegKeyboard className="icon" />
            Soundboard
          </span>
          <Link className="settings" to="/settings" title="Settings">
            <FaCog className="icon" />
          </Link>
        </div>
        <div className="body">
          <ToastContainer />
          <Switch>
            <Route path="/settings" component={SettingsView} />
            <Route path="/">
              <SoundsView
                stopAllSounds={stopAllSounds}
                registerSound={registerSound}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
