const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      name: 'modselect',
      type: 'umd'
    }
  },
  // devtool: 'source-map',
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx|.ts|.tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: {
          loader: "file-loader?name=/public/icons/[name].[ext]",
          options: {
            name: '/public/icons/[name].[ext]',
            outputPath: 'dist',
          }
        }
      },
      // {
      //   test: /\.js$/,
      //   enforce: "pre",
      //   use: ["source-map-loader"],
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', ".ts", ".tsx"]
  },
  externals: {
    react: 'react',
    "react-dom": 'react-dom'
  }
};
