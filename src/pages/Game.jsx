import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTrivia, getScore } from '../Redux/Actions';
import Header from '../components/Header';

class Game extends Component {
  state = {
    arrayAnswers: [],
    curentQuestion: 0,
    correct: 'black',
    incorrect: 'black',
    timer: 30,
    isBtnAnswerDisable: false,
  };

  async componentDidMount() {
    const getToken = localStorage.getItem('token');
    const { dispatch } = this.props;
    await dispatch(getTrivia(getToken));
    this.checkToken();
    this.setAnswers();
    this.gameTimer();
  }

  loginClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  checkToken = () => {
    const { questions } = this.props;
    const errorCode = 3;
    const { history } = this.props;
    if (questions?.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  renderQuestion = () => {
    const { questions } = this.props;
    // console.log(questions.results);
    const { curentQuestion } = this.state;
    if (questions.results) {
      const renderQuestion = questions?.results[curentQuestion];
      return renderQuestion;
    }
  };

  shuffle = (array) => {
    const magicNumber = 0.5;
    return array.slice().sort(() => Math.random() - magicNumber);
  };
  // Função para randomizar elementos de um array. Referência https://javascript.info/task/shuffle

  setAnswers = () => {
    this.setState({
      arrayAnswers: this.renderQuestion() && [...this.renderQuestion().incorrect_answers,
        this.renderQuestion()?.correct_answer],
    }, () => {
      const { arrayAnswers } = this.state;
      const sortAnswers = this.shuffle(arrayAnswers);
      this.setState({
        arrayAnswers: sortAnswers,
      });
    });
  };

  gameTimer = () => {
    const second = 1000;
    const idSetInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          // console.log(idSetInterval);
          clearInterval(idSetInterval);
          this.setState({ isBtnAnswerDisable: true });
        }
      });
    }, second);
  };

  handleColor = () => {
    this.setState({
      correct: 'solid rgb(6, 240, 15) 3px',
      incorrect: 'solid red 3px',
    });
  };

  difficultyScore = (difficulty) => {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let difficultyPoint = 0;
    if (difficulty === 'hard') {
      difficultyPoint = hard;
    } else if (difficulty === 'medium') {
      difficultyPoint = medium;
    } else {
      difficultyPoint = easy;
    }
    return difficultyPoint;
  };

  playerScore = ({ target }) => {
    const correctAns = 10;
    const { timer } = this.state;
    const difficultyPoint = this.difficultyScore(target.id);
    if (target.value === 'correct') {
    //  this.setState({ scoreQuestion: correctAns + (timer * difficultyPoint) });
      const { dispatch, score, corAnswers } = this.props;
      const scoreQuestion = correctAns + (timer * difficultyPoint);
      const totScore = scoreQuestion + score;
      const totAnswers = corAnswers + 1;
      dispatch(getScore({ totScore, totAnswers }));
    }
    this.setState({ isBtnAnswerDisable: true });
    this.handleColor();
  };

  nextQuestion = () => {
    // console.log('teste botão');
    const { history } = this.props;
    const { curentQuestion } = this.state;
    const number = 4;
    if (curentQuestion === number) {
      history.push('/feedback');
    } else {
      this.setState({
        curentQuestion: curentQuestion + 1,
        timer: 30,
        isBtnAnswerDisable: false,
        correct: 'black',
        incorrect: 'black',
      }, () => this.setAnswers());
    }
  };

  render() {
    const { questions } = this.props;
    const { arrayAnswers, correct, incorrect, timer, isBtnAnswerDisable } = this.state;
    // console.log(arrayAnswers);
    return (
      <div>
        <Header />
        <h1>{ timer }</h1>
        <p>Game</p>
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
            if (answer === this.renderQuestion()?.correct_answer) {
              return (

                <button
                  type="button"
                  disabled={ isBtnAnswerDisable }
                  id={ this.renderQuestion()?.difficulty }
                  data-testid="correct-answer"
                  style={ { border: correct } }
                  onClick={ this.playerScore }
                  value="correct"
                >
                  {answer}

                </button>
              );
            }
            return (
              <button
                key={ answer }
                id={ this.renderQuestion()?.difficulty }
                type="button"
                disabled={ isBtnAnswerDisable }
                data-testid={ `wrong-answer-${index}` }
                style={ { border: incorrect } }
                onClick={ this.playerScore }
                value="incorrect"
              >
                {answer}
              </button>
            );
          })}
        </section>
        {isBtnAnswerDisable && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>
        )}
        {/* <button type="button" onClick={ this.setAnswers }>log</button> */}
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.loginClick }
        >
          Play Again
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.rankingClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  score: state.player.score,
  corAnswers: state.player.corAnswers,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  questions: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
