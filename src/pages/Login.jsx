import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayerAction } from '../Redux/Actions';
import logo from '../styles/trivia.png';
import '../styles/login.css';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    isBtnDisabled: true,
  };

  componentDidMount() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((jsonResponse) => localStorage.setItem('token', jsonResponse.token))
      .catch(() => localStorage.setItem('token', 'erro'));
  }

  validateBtn = () => {
    const { email, nome } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const MIN_CHARACTERS = 1;
    const validateEmail = regex.test(email);
    const validateName = nome.length >= MIN_CHARACTERS;
    this.setState({ isBtnDisabled: !(validateEmail && validateName) });
    // atualiza o estado da chave isBtnDisabled
    // quando a validação do email e password retornarem true, isBtnDisabled atualiza para false.
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validateBtn();
    });
  };

  settingsClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  onClick = () => {
    const { history, dispatch } = this.props;
    const { email, nome } = this.state;
    dispatch(
      addPlayerAction({
        email,
        nome,
      }),
    );
    history.push('/game');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (

      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <fieldset>
            <legend>LOGIN</legend>
            <label htmlFor="nome">
              Nome
              <input
                id="nome"
                data-testid="input-player-name"
                type="text"
                name="nome"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label htmlFor="email">
              Email
              <input
                id="email"
                data-testid="input-gravatar-email"
                type="text"
                name="email"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isBtnDisabled }
              onClick={ this.onClick }
            >
              Play 🕹️
            </button>
          </fieldset>
        </form>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.settingsClick }
        >
          Settings ⚙️
        </button>
      </header>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Login);
