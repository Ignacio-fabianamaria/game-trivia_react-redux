import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

export default class Rotas extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}
