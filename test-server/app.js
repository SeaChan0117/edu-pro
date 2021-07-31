/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(express.static('./dist'))
app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))
app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))

// app.get('/', (req, res) => {
//   res.send('hello word')
// })

app.listen(3000, () => {
  console.log('server is started')
})
