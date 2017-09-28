import { createStore } from "redux";
import hanoiApp from "./reducers";
import {
	moveHanoi,
	beginMove,
	endMove,
	mouse,
	setHeight,
	gameReset,
	increaseCount
} from "./actions";
import React from "react";
import ReactDOM from "react-dom";
import config from "./config";

let store = createStore(hanoiApp);

class Hanoi extends React.Component{
	componentDidMount(){
		this.updateCanvas();
	}
	componentDidUpdate(){
		this.updateCanvas();
	}
	updateCanvas(){
		const context = this.canvas.getContext("2d");

		const { map, stage, colors, node } = this.props.config;
		const { options, hanois, mouse } = this.props.state;

		// shortcut
		const sw = stage.width;
		const sh = stage.height;

		context.save();

		// draw background
		context.fillStyle = "#5c7166";
		context.fillRect(0, 0, sw, sh);

		// draw map
		context.fillStyle = "black";
		context.fillRect(0, sh - map.height, sw, map.height);

		for(let i = 0; i < 3; i ++){
			const x = sw / 3 * (i + 0.5) - map.thickness / 2;

			context.fillRect(x, 70, map.thickness, sh - 70 - map.height);
		}

		// draw

		for(let i = 0; i < 3; i ++){
			for(let j = 0; j < hanois.nodes[i].length; j ++){
				const weight = hanois.nodes[i][j];

				const width = node.width * .9 ** (options.height - weight);

				const x = sw / 3 * (i + 0.5) - width / 2;

				context.save();
				context.fillStyle = colors[options.height - weight] || "#919191";
				if(hanois.from === i && hanois.nodes[i].length - 1 === j){
					context.fillRect(mouse.x - width / 2, mouse.y - node.height / 2, width, node.height);
				} else {
					context.fillRect(x, sh - map.height - node.height * (j + 1), width, node.height);
				}
				context.restore();
			}
		}

		context.restore();
	}
	handler(e){
		const rect = this.canvas.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const sw = this.props.config.stage.width;
		const sh = this.props.config.stage.height;

		const index = x / sw * 3 | 0;

		switch(e.type){
			case "mousedown":
				store.dispatch(beginMove(index));
				break;
			case "mouseup":
				store.dispatch(endMove(index));
				store.dispatch(increaseCount());
				break;
			case "mousemove":
				store.dispatch(mouse(x, y));
		}
	}
	render(){
		return (
			<canvas
				ref={node => this.canvas = node}
				width={this.props.config.stage.width}
				height={this.props.config.stage.height}
				onMouseDown={this.handler.bind(this)}
				onMouseUp={this.handler.bind(this)}
				onMouseMove={this.handler.bind(this)}
				/>
		);
	}
}

class Option extends React.Component {
	render(){
		const { options } = this.props.state;

		return (
			<div className="option">
				<h1>Configuration</h1>
				<div className="section">
					<label>
						Height:
						{" "}
						<input type="number" value={options.height} onChange={e => {
							store.dispatch(gameReset(e.target.value));
						}} />
					</label>
				</div>
				<div className="section">
					<label>
						Count:
						{" "}
						<span>{options.count}</span>
					</label>
				</div>
			</div>
		);
	}
}

class HanoiApp extends React.Component {
	render(){
		return (
			<div>
				<Hanoi state={this.props.state} config={this.props.config} />
				<Option state={this.props.state} config={this.props.config} />
			</div>
		);
	}
}

const render = () => {
	ReactDOM.render(
		<HanoiApp state={store.getState()} config={config} />,
		document.getElementById("container")
	);
}

let unsubscribe = store.subscribe(() => {
	render();
});
render();

store.dispatch(gameReset(5));

//unsubscribe();
