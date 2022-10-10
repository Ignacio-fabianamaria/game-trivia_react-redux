import actionTypes from './actionTypes';

const {
  ADD_LOGIN,
  GET_TRIVIA_QUESTIONS,
} = actionTypes;

export const addEmail = (payload) => ({
  type: ADD_LOGIN,
  payload,
});

export const getTriviaQuestions = (payload) => ({
  type: GET_TRIVIA_QUESTIONS,
  payload,
});

export const getTrivia = () => async (dispatch) => {
  const getToken = localStorage.getItem('token');
  const triviaData = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
  const response = await triviaData.json(getToken);
  // const questions = Object.entries(response)[1][1];
  dispatch(getTriviaQuestions(response));
};
