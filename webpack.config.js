const
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
  HtmlWebpackPugPlugin = require('html-webpack-pug-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin')
	webpack = require('webpack')

module.exports = {
	entry: {
		app: './src/Entry.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'CXXPODS',
      fileType: 'pug',
      template: "!!pug-loader!./src/index.pug"
		}),
    new HtmlWebpackPugPlugin(),
    new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}