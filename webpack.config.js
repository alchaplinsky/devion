module.exports = {
  mode: 'none',
  target: 'node',
  entry: {
   index:  './src/programmatic/index.js',
   cli: './src/cli/index.js'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
