const { defineConfig } = require('@vue/cli-service')
// vue.config.js

module.exports = {
  transpileDependencies: ['*'],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
