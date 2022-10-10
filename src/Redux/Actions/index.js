import actionTypes from './actionTypes';

const { ADD_PLAYER } = actionTypes;

export default function addPlayerAction(name, gravatarEmail) {
  return {
    type: ADD_PLAYER,
    payload: {
      name,
      gravatarEmail,
    },
  };
}
