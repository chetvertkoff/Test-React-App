import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import {CleanWebpackPlugin}  from 'clean-webpack-plugin'
import pngquant from 'pngquant'
import imageminMozjpeg from 'imagemin-mozjpeg'
import ImageminPlugin from 'imagemin-webpack-plugin'
// import PurgecssPlugin from 'purgecss-webpack-plugin'

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'assets/'
}

export default {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
    // module: `${PATHS.src}/your-module.js`,
  },
  devtool: 'inline-source-map',
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
    sourceMapFilename: 'bundle.map'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // filename: 'assets/js/vendor.js',
          name:'vendor',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },{
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: false, config: { path: `./build/postcss.config.js` } }
        }
      ]
    },
    {
      test: /\.sass$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./build/postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    },
    {
      test: /\.(svg|png|gif|jpg)$/,
      exclude: /fonts/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(ttf|eot|woff|svg|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: `${PATHS.src}/static/fonts/[name].[ext]`,
        }
      }
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/static/img`, to: `${PATHS.assets}/img` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),
    new ImageminPlugin({
      pngquant: ({quality: 50}),
      plugins: [imageminMozjpeg({quality: 50})]
    })
  ],
}
