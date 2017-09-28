import { combineReducers } from "redux";

import {
	SET_HEIGHT,
	MOVE_HANOI,
	GAME_RESET,
	BEGIN_MOVE,
	END_MOVE,
	INCREASE_COUNT,
	MOUSE
} from "./actions";

function initHanois(height){
	const hanois = [ [], [], [] ];

	for(let i = 0; i < height; i ++)
		hanois[0].push(height - i);

	return hanois;
}

const options = (state = { height: 3, count: 0, time: 0, started: false }, action) => {
	switch(action.type){
		case SET_HEIGHT:
			return {
				...state,
				height: action.height
			};
		case GAME_RESET:
			return {
				height: action.height,
				count: 0,
				time: 0,
				started: true
			};
		case INCREASE_COUNT:
			return {
				...state,
				count: state.count + 1
			}
		default:
			return state;
	}
};
const mouse = (state = { x: 0, y: 0 }, action) => {
	switch(action.type){
		case MOUSE:
			return {
				x: action.x,
				y: action.y
			};
		default:
			return state;
	}
}
const hanois = (state = {
	from: -1,
	nodes: [ [], [], [] ]
}, action) => {
	switch(action.type){
		case BEGIN_MOVE:
			if(action.from < 0 || action.from > 2)
				return state;
			return {
				...state,
				from: action.from
			};
		case END_MOVE:{
			const s = {
				...state,
				from: -1,
				nodes: [
					[...state.nodes[0]],
					[...state.nodes[1]],
					[...state.nodes[2]]
				]
			};


			if(state.from === -1)
				return state;

			const from = s.nodes[state.from].slice(-1).pop();
			const to = s.nodes[action.to].slice(-1).pop();

			console.log(from, to);

			if(typeof from !== "undefined" && typeof to === "undefined" || from < to){
				s.nodes[action.to].push(s.nodes[state.from].pop());
			}

			return s;
		}
		case MOVE_HANOI:
			return state;
		case GAME_RESET:
			return {
				...state,
				from: -1,
				nodes: initHanois(action.height)
			};
		default:
			return state;
	}
}

export default combineReducers({
	options,
	hanois,
	mouse
});
