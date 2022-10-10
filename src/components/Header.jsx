import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  state = {
    urlImg: '',
    scoreTest: '0' };

  componentDidMount() {
    this.emailToHash();
  }

  emailToHash = async () => {
    // const { email } = this.props;
    const urlImg = await MD5('jefferson.felix182@gmail.com').toString();
    this.setState({ urlImg });
    console.log(urlImg);
  };

  render() {
    const { name } = this.props;
    const { urlImg, scoreTest } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${urlImg}` }
          alt="Imagem do Usuário"
        />
        <h3 data-testid="header-player-name">{ `Usuário: ${name}` }</h3>
        <h3 data-testid="header-score">{ `Pontuação: ${scoreTest}` }</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
