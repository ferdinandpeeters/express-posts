const express = require('express');
const app = express();
const request=require('request');
const bodyParser = require('body-parser');

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Redirect to posts
app.get('/', (req, res) => {
   res.redirect('/posts');
});

// List all posts
app.get('/posts', (req, res) => {
  request.get({
    url: 'http://jsonplaceholder.typicode.com/posts'
  }, function(err,result){
    res.render('posts.ejs', { posts: JSON.parse(result.body) });
  });
});
// Show the search form
app.get('/search', (req, res) => {
  res.render('search.ejs', {result: ''})
});

// Find all comments for post
app.post('/search', (req, res) => {
  var name = req.body['title'];
  request.get({
    url: 'http://jsonplaceholder.typicode.com/posts'
  }, function(err,result){
    var posts = JSON.parse(result.body);
    var id = -1;
    for (var post in posts) {
      if (posts[post].title == name)
        id = posts[post].id;
    }
    if(id == -1)
      res.render('search.ejs', { product: '' })
    else {
      request.get({
        url: 'http://jsonplaceholder.typicode.com/posts/' + id.toString() + '/comments'
      }, function(err,r){
        console.log(JSON.parse(r.body));
        res.render('search_result.ejs', { comments: JSON.parse(r.body) })
      })
    }
  });
});
