const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV
const devMode = env === 'development'
module.exports = {
  entry: {
    polyfills: './src/utils/polyfills.js',
    app: './src/index.js',
    // print: './src/print.js',
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/'
  },
  plugins: [

    new CleanWebpackPlugin([ '../dist' ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
      // chunks:['app'],
      excludeChunks: [ 'polyfills' ]
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.ProvidePlugin({
      _: 'lodash'
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    // new webpack.optimize.AggressiveSplittingPlugin({
    //   minSize: 30000,
    //   maxSize: 50000,
    //   chunkOverhead: 0,
    //   entryChunkMultiplicator: 1
    // }),

    new VueLoaderPlugin()

    // new webpack.config.optimization.splitChunks({
    //   name: 'common'
    // })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "initial",
          minChunks: Infinity
        },
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true
        // }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "../src")
        ],
        use: [
          !devMode ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            } :
            // {
            //   loader: "style-loader",
            //
            // },

            {
              loader: 'vue-style-loader'
            },
          {
            loader: "css-loader",
            options: {
              import: false,
              // minimize: env === 'production',
              // sourceMap: env === 'development',
            }
          },
          'postcss-loader',
          // {
          // loader:  'postcss-loader',
          // options:{
          //   config: {
          //     path: path.resolve(__dirname, '../postcss.config.js')
          //   }
          // }
          // },
          {
            loader: "sass-loader",
            options: {
              sourceMap: devMode
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [ path.resolve(__dirname, "../src/global.scss") ]
            }
          },

        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [ 'csv-loader' ]
      },
      {
        test: /\.xml$/,
        use: [ 'xml-loader' ]
      },
      {
        test: require.resolve('../src/utils/globals.js'),
        use: 'exports-loader?globals'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)/,
        // exclude: [
        //   path.resolve(__dirname, "../node_modules"),
        //   path.resolve(__dirname, "../src/utils/"),
        // ],
        include: [
          path.resolve(__dirname, "../src")
        ],
        use: [
          'babel-loader'

        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
        // loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     // js: 'babel-loader!eslint-loader',
        //     sass:[
        //       'vue-style-loader',
        //       'css-loader',
        //       // 'postcss-loader',
        //       'sass-loader?indentedSyntax=1',
        //       {
        //         loader: 'sass-resources-loader',
        //         options: {
        //           resources: path.resolve(__dirname, '../src/global.scss'),
        //         },
        //       },
        //     ],
        //     scss: [
        //       'vue-style-loader',
        //       'css-loader',
        //       // 'postcss-loader',
        //       'sass-loader',
        //       {
        //         loader: "sass-resources-loader",
        //         options:{
        //           resources: path.resolve(__dirname, '../src/global.scss'),
        //         }
        //       }
        //     ] // <style lang="scss">
        //   }
        // }
      },

    ],

  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, '../src/utils')
    },
    modules: [ path.resolve(__dirname, '../public/lib'), 'node_modules' ],
    extensions: [ ".js", ".json", ".vue", ".jsx" ]
  }
}
