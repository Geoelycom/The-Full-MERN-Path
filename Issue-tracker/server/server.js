const express = require('express')
const bodyParser = require('body-parser')
const app  = express()
app.use(express.static('public'))