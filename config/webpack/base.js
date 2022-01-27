const { webpackConfig, merge } = require('@rails/webpacker')

const customConfig = {
    resolve: {
      extensions: ['.css', '.scss']
    },
    module: {
        rules: [
          {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
          }
        ]
    }
  }
  
module.exports = merge(webpackConfig, customConfig)