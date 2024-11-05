const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './app/index.js'],
  devServer: {
    allowedHosts: 'auto',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  },
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'app'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                '@babel/plugin-proposal-object-rest-spread',
              ],
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader'],
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'app', 'components', 'css'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.otf/i,
        include: path.resolve(__dirname, 'app', 'font'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },
    ],
  },
};
