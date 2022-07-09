const path = require('path');
const fs = require("fs");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

const filename = ext => isDev ?
  `[name].${ext}` :
  `[name].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (!isDev) {
    config.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }

  return config;
}

const otherPages = fs
  .readdirSync(path.resolve(__dirname, "src/pages/"))
  .filter(fileName => fileName.endsWith(".pug"));

module.exports = {
  mode,

  context: path.resolve(__dirname, 'src'), // указание на папку исходных файлов

  resolve: {
    extensions: ['.js', '.css', '.scss', '.json', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.pug'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  entry: {
    main: ['@babel/polyfill', './js/index.js']
  },

  output: {
    filename: `js/${filename('js')}`,
    path: path.resolve(__dirname, 'build'),
    environment: {
      arrowFunction: false,
    },
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname,'src/index.pug'),
      //inject: false
    }),
    ...otherPages.map(page => {
      const temp = page
        .split(".")
        .slice(0, -1)
        .join(".");

      return new HtmlWebpackPlugin({
        filename: `pages/${temp}.html`,
        template: `pages/${page}`,
        inject: false,
        minify: false
      });
    }),
    new MiniCssExtractPlugin({
      filename: `css/style.css`
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'favicon/**',
          to: path.resolve(__dirname, 'build')
        },
        {
          from: "fonts/**",
          to: path.resolve(__dirname, 'build')
        },
        {
          from: "libs/**",
          to: path.resolve(__dirname, 'build')
        },
      ]
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
              sourceMap: isDev,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                      browsers: 'last 5 versions',
                      autoprefixer: {
                        grid: true
                      }
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: false
            }
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true
            }
          }
        ]
      }
    ],
  },

  optimization: optimization(),
  devServer: {
    watchFiles: ['src/**/*'],
    port: 8080, // порт
    open: true, // открывать браузер при запуске
    hot: true, // при добавлении новых модулей сразу их подключать
    compress: true, // gzip компрессия
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    }, // оверлей при ошибках
    devMiddleware: {
      writeToDisk: false, // записывать файлы в папку build
    },
    historyApiFallback: true, // использование history HTML5

  },
  devtool: isDev && 'source-map'
}
