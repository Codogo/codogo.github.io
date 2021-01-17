var path = require('path');
var fs = require('fs');
var url = require('url');
var webpack = require('webpack');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
	return path.resolve(appDirectory, relativePath);
}

module.exports = {
	// webpack folder’s entry js — excluded from jekll’s build process.
	entry: [
		"whatwg-fetch",
		resolveApp("./src/assets/js/app.js"),
	],
	//watch: true,
	devtool: "source-map",
	output: {
		// we’re going to put the generated file in the assets folder so jekyll will grab it.
		path: resolveApp('./src/assets/js/'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader', // ‘babel-loader’ is also a legal name to reference
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	]
};