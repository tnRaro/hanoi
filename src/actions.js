export const SET_HEIGHT = "SET_HEIGHT";
export const MOVE_HANOI = "MOVE_HANOI";
export const BEGIN_MOVE = "BEGIN_MOVE";
export const END_MOVE = "END_MOVE";
export const MOUSE = "MOUSE";
export const GAME_RESET = "GAME_RESET";
export const INCREASE_COUNT = "INCREASE_COUNT";

export const setHeight = (height) => ({ type: SET_HEIGHT, height });
export const moveHanoi = (from, to) => ({ type: MOVE_HANOI, from, to });
export const beginMove = (from) => ({ type: BEGIN_MOVE, from });
export const endMove = (to) => ({ type: END_MOVE, to });
export const mouse = (x, y) => ({ type: MOUSE, x, y });
export const gameReset = (height) => ({ type: GAME_RESET, height });
export const increaseCount = () => ({ type: INCREASE_COUNT });
