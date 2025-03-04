const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.20.90.200:1176',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    }
  },

  transpileDependencies: true
})
