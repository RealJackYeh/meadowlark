const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const handlers = require('./lib/handlers') // for unit test
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')

switch(app.get('env')) {
  case 'development':
    app.use(morgan('dev'))
    break
  case 'production':
    const stream = fs.createWriteStream(__dirname + '/access.log',
    { flags: 'a'})
    app.use(morgan('combined', { stream }))
    break
}

// configure Handlebars view engine
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts'
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
const port = process.env.PORT || 3000
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/headers', (req, res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
  res.send(headers.join('\n'))
  console.log('req.ip = ' + req.ip)
  console.log('req.url = ' + req.url)
  console.log('req.originalUrl = ' + req.originalUrl)
})
app.get('/greeting', (req, res) => {
  res.render('greeting', {
    message: 'Hello Jack Yeh',
    style: req.query.style,
    userid: req.cookies.userid,
    //username: req.session.username
  })
})
app.get('/no-layout', (req, res) => res.render('no-layout', { layout: null }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.post('/process', (req, res) => {
  //console.log(req.headers)
  //console.log(req.body)
  res.send({ result: 'success' })
})
const multiparty = require('multiparty')
app.post('/processfile', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message })
    //console.log('field data: ', fields)
    //console.log('files: ', files)
    res.send({ result: 'success' })
  })
})
const tours = [
  {id:0, name: 'Jack Yeh', price: 99.99},
  {id:1, name: 'Melissa Yu', price: 149.99},
]
app.get('/api/tours', (req, res) => {
  res.json(tours)
})
app.use(handlers.notFound)
app.use(handlers.serverError)

/*
// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})
*/
/*
app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
*/
if(require.main === module) {
  app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` +
        `in ${app.get('env')} mode; press Ctrl-C to terminate.`)
    })
} else {
  module.exports = app
}