const express = require('express')
const {engine} = require('express-handlebars')

const app = express()
const handlers = require('./lib/handlers') // for unit test

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
        '; press Ctrl-C to terminate.')
    })
} else {
    module.exports = app
}