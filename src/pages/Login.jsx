import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  state = {
    nome: '',
    email: '',
    isBtnDisabled: true,
  };

  validateBtn = () => {
    const { email, nome } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const MIN_CHARACTERS = 1;
    const validateEmail = regex.test(email);
    const validateName = nome.length >= MIN_CHARACTERS;
    this.setState({ isBtnDisabled: !(validateEmail && validateName) });
    // atualiza o estado da chave isBtnDisabled
    // quando a validação do email e password retornarem true, isBtnDisabled atualiza para false
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.validateBtn();
    });
  };

  onClick = async () => {
    const { history } = this.props;

    // const response = await fetch('https://opentdb.com/api_token.php?command=request')
    // const json = await response.json()
    // localStorage.setItem('token', json.token)

    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((jsonResponse) => localStorage.setItem('token', jsonResponse.token))
      .catch(() => localStorage.setItem('token', 'erro'));

    history.push('/TESTANDO');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div>
        <h1>LOGIN</h1>
        <form>
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
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
