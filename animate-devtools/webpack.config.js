const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

const rules = [
	{
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	},
	{
		test: /\.m?js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					'@babel/plugin-proposal-class-properties',
					'@babel/plugin-proposal-private-methods',
					'@babel/plugin-transform-runtime',
				],
			},
		},
	},
	{
		test: /\.vue$/,
		loader: 'vue-loader',
	},
	{
		test: /\.(p|post)?css$/i,
		use: ['style-loader', 'css-loader', 'postcss-loader'],
	},
	{
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'assets/fonts/[name][ext]',
		},
	},
	{
		test: /\.html$/i,
		type: 'asset/resource',
		generator: {
			filename: 'assets/html/[name][ext]',
		},
	},
	{
		test: /\.html$/i,
		use: ['extract-loader', 'html-loader'],
	},
];

module.exports = [
	{
		mode: process.env['NODE_ENV'] || 'development',
		devtool: 'cheap-module-source-map',
		entry: {
			'background/index': './src/background/index.ts',
			'content/index': './src/content/index.ts',
			'content/hook/animate-hook': './src/content/hook/app.ts',
			'popup/index': './src/popup/index.ts'
		},
		output: {
			path: path.join(__dirname, 'build/chrome'),
			filename: '[name].js',
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		module: {
			rules
		},
		plugins: [
			new WebpackBar(),
			new VueLoaderPlugin(),
			new CopyPlugin({
				patterns: [
					{ from: 'src/assets', to: 'assets' },
					{ from: 'src/manifest.json', to: 'manifest.json' },
					{ from: '**/assets/**/*.*', to: '', context: 'src'},
					{ from: '**/*.html', to: '', context: 'src' },
				],
			}),
		],
	},
];
