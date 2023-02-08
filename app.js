
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Your life is a movie. You are the main character. You say your scripts and act to your lines. Of course you do your lines in each scene. There is a hidden camera and a director who you can ask for help anytime up above.";
const aboutContent = "You can't make a fan of everyone. Stay true to your story, characters, music, art or whatever it is you do and fuck everyone else who doesn't like it. Life isn't perfect.";
const contactContent = "Dreams. They start in your beautiful mind. Think of beautiful things and it will manifest into actions because your body will listen to you. Like it always does";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/",function(req,res){

  res.render("home",
  { startingContent : homeStartingContent,
    posts:posts
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutcont : aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactCont : contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:postName",function(req,res){
  const reqTitle =  _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedtitle = _.lowerCase(post.title);
    if(storedtitle === reqTitle){
      res.render("post",{
        title : post.title,
        content : post.content
      });
    }
  })
});

app.post("/compose",function(req,res){
  const post = {
    title: req.body.title,
    content: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");
});












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
