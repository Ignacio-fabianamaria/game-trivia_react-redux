import actionTypes from '../Actions/actionTypes';

const { ADD_PLAYER, ADD_POINTS, GET_SCORE } = actionTypes;

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  corAnswers: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.payload.name.nome,
      gravatarEmail: action.payload.name.email,
    };
  case ADD_POINTS:
    return { ...state, ...action.payload };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload.totScore,
      corAnswers: action.payload.totAnswers,
    };
  default:
    return { ...state };
  }
}

export default player;
