import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { CustomSongView } from './application/CustomSongView';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={CustomSongView} />
      </Switch>
    </Router>
  );
}
