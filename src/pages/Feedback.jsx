import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  state = {
    urlImg: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const urlImg = md5(gravatarEmail).toString();
    this.setState({ urlImg });
  }

  render() {
    const { name, score } = this.props;
    const { urlImg } = this.state;
    console.log(score, 'SCORE');
    const magicN = 3
    const verifScore = score >= magicN;
    return (
      <div>
        <h1>Feedback Component</h1>
        <header className="header-feedback">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${urlImg}` }
            alt="Imagem do Usuário"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
        {verifScore
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
