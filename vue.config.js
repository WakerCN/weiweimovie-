module.exports = {
  // 静态资源路径
  publicPath: '/weiwei',

  devServer: {
    proxy: {
      '/ajax2': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      }
    }
  }
}
