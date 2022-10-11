import actionTypes from './actionTypes';

const {
  ADD_PLAYER,
  GET_TRIVIA_QUESTIONS,
  GET_SCORE,
} = actionTypes;

export const getTriviaQuestions = (payload) => ({
  type: GET_TRIVIA_QUESTIONS,
  payload,
});

export const getTrivia = () => async (dispatch) => {
  const getToken = localStorage.getItem('token');
  const triviaData = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
  const response = await triviaData.json(getToken);
  // history.push /
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

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});
