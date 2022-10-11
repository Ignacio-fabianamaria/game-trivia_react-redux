import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Settings from './Settings';
import Game from './Game';
import Feedback from './Feedback';

export default class Rotas extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
          <Route exact path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </div>
    );
  }
}
