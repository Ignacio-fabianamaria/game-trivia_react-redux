import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = { };

  loginClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Component Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.loginClick }
        >
          Go home
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
