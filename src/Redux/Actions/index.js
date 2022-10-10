import actionTypes from './actionTypes';

const {
  ADD_PLAYER,
  GET_TRIVIA_QUESTIONS,
} = actionTypes;

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

export function addPlayerAction(name, gravatarEmail) {
  return {
    type: ADD_PLAYER,
    payload: {
      name,
      gravatarEmail,
    },
  };
}
