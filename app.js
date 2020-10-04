const { fileLoader } = require('ejs')
const express = require('express')
const app = express()
const router = require('./router')
const filesuploaded = require('express-fileupload')

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(filesuploaded())


app.use(router)


app.listen(3000)