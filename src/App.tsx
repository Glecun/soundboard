import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.global.css';
import { FaCog, FaRegKeyboard } from 'react-icons/fa/';
import SoundsView from './application/view/SoundsView';
import SettingsView from './application/view/SettingsView';

export default function App() {
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
          <Switch>
            <Route path="/settings" component={SettingsView} />
            <Route path="/" component={SoundsView} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
