import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrivia } from '../Redux/Actions';

class Game extends Component {
  state = {
    questNumber: 0,
    arrayAnswers: [],
    userToken: localStorage.getItem('token'),
  };

  async componentDidMount() {
    const { userToken } = this.state;
    const { dispatch } = this.props;
    await dispatch(getTrivia(userToken));
    this.checkToken();
    this.setAnswers();
  }

  checkToken = () => {
    const { questions } = this.props;
    const errorCode = 3;
    const { history } = this.props;
    if (questions && questions.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  renderQuestion = () => {
    const { questions } = this.props;
    const renderQuestion = questions.results[0];
    return renderQuestion;
  };

  shuffle = (array) => {
    const magicNumber = 0.5;
    return array.slice().sort(() => Math.random() - magicNumber);
  };
  // Função para randomizar elementos de um array. Referência https://javascript.info/task/shuffle

  setAnswers = () => {
    this.setState({
      arrayAnswers: [...this.renderQuestion().incorrect_answers,
        this.renderQuestion()?.correct_answer],
    }, () => {
      const { arrayAnswers } = this.state;
      const sortAnswers = this.shuffle(arrayAnswers);
      this.setState({
        arrayAnswers: sortAnswers,
      });
    });
  };

  render() {
    const { questions } = this.props;
    const { arrayAnswers } = this.state;
    return (
      <div>
        Game
        <h3
          data-testid="question-category"
        >
          {questions && this.renderQuestion()?.category}

        </h3>
        <p data-testid="question-text">
          {questions && this.renderQuestion()?.question}
        </p>
        <section data-testid="answer-options">
          {arrayAnswers.map((answer, index = 0) => {
            if (answer === this.renderQuestion().correct_answer) {
              return (

                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {answer}

                </button>
              );
            }
            return (
              <button
                key={ answer }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>
            );
          })}
        </section>

        {/* <button type="button" onClick={ this.setAnswers }>log</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  questions: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
