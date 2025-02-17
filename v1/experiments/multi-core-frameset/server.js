'use strict'

const port = 3000

const express = require('express')
const fs = require('fs')

fs.mkdirSync('./public/scripts', { recursive: true })
fs.copyFileSync('../../dist/bundle.js', './public/scripts/bundle.js')

const app = express()
app.use(express.static('public'))

app.listen(port, () => { console.log('server listening on port ' + port)})
