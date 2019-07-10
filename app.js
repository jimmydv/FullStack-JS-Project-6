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

app.get('/project:id', (req, res, next) => {
    const id = req.params.id;
    if(data[id]===undefined){ // throws an error if id inputed in teh browser url is not correct
      const err = new Error("Oops! Sorry something went wrong.");
      console.log(err);
      err.status = 500;
      next(err);
    }else{
    res.render('project', {project:data[id]});
  }
})
// Routing Error Hanlding 404
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// app.use((req, res, next) => {
//  const  err = new Error("Oops! Sorry something went wrong.");
//   console.log("Oops! Sorry something went wrong.")
//   err.status = 500;
//   next(err);
// });


app.use((err, req, res, next) =>{
  res.locals.error = err;
  res.status; // pick the status from the error handling middlewears if there is an error. No need to pass the value.
  res.render('error');
});

app.listen(3000,console.log("Server running on port 3000!"));
