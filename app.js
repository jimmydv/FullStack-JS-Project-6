const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();
app.use('/static', express.static('public'))
app.use(express.static('images'))
const data = require('./data.json').projects;
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('index', {projects:data});
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/project:id', (req, res) => {
    const id = req.params.id;
    res.render('project', {project:data[id]});
})

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  console.log(err.message)
  next(err);
});

app.use((err, req, res, next) =>{
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000,console.log("Server running on port 3000!"));
