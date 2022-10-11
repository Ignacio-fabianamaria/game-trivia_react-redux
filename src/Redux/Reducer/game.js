import actionTypes from '../Actions/actionTypes';

const INITIAL_STATE = {
  questions: {},
  code: 0,
};

const {
  GET_TRIVIA_QUESTIONS,
} = actionTypes;

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TRIVIA_QUESTIONS: {
    console.log(action.payload);
    return {
      ...state,
      questions: action.payload,
      code: action.payload.response_code,
    };
  }
  default:
    return {
      ...state,
    };
  }
};
export default game;
