import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    nome: '',
    email: '',
    isBtnDisabled: true,
  };

  validateBtn = () => {
    console.log('chamando');
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
          <button type="button" data-testid="btn-play" disabled={ isBtnDisabled }>
            Play
          </button>
        </form>
      </div>
    );
  }
}
