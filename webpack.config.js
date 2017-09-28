const path = require("path");

module.exports = {
	entry: "./index",
	context: path.resolve(__dirname, "src"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader"
			}
		]
	},
	devtool: "source-map"
};
