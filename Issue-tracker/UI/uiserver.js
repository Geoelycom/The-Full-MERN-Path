const express = require('express')
const app  = express()
const enableHMR = (process.env.ENABLE_HMR || "true") === "true";
if(enableHMR && (process.env.NDE_ENV !=="production")){
console.log('Adding dev middleware, enabling HRM');

/*  eslint "global-require" : "off" */
/* eslint "import/no-extraneous-dependencies": "off" */
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config')
config.entry.app.push('webpack-hot-middleware/client')
config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
app.use(devMiddleware(compiler));
app.use(hotMiddleware(compiler));

}












app.use(express.static('public'))

app.listen(3000, () => {
  console.log('listening at port 3000')
})