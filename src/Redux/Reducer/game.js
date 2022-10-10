import actionTypes from '../Actions/actionTypes';

const INITIAL_STATE = {
  questions: {},
};

const {
  GET_TRIVIA_QUESTIONS,
} = actionTypes;

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TRIVIA_QUESTIONS: {
    return {
      ...state,
      questions: action.payload,
    };
  }
  default:
    return {
      state,
    };
  }
};
export default game;
