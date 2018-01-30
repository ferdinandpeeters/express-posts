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


        request.get({
          url: 'http://jsonplaceholder.typicode.com/posts'
        }, function(err,result){
          console.log(result);
          if(err)
            res.render('search.ejs', { product: '' })
          if(result.statusCode !== 200 )
          console.log(res.body)
            res.render('search_result.ejs', { product: result.body })
        });
});

// Find all comments for post
app.post('/search', (req, res) => {});
