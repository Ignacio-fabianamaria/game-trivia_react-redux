import React, { Component } from 'react';
import Header from '../components/Header';

export default class Settings extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="settings-title">GAME Component</h2>
        <Header />
      </div>
    );
  }
}
