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