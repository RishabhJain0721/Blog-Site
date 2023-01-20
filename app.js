const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "This is the home page of the blog site project which contains all the posts in an abbreviated form(if content is more than 100 words).You may click on the post to read the full post.To add new posts,click on the compose button.";
const aboutContent = "Hello there! This is the about page of the blog site project.The goal of this project was to get a better understanding of the backend development using node.js and express.js and of the ejs templating engine.";
const contactContent = "Contact us at : abc@gmail.com";

const app = express();

const PORT = 3000 || process.env.PORT;

app.listen(PORT, function() {
  console.log("Server started on port 3000");
});


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
  res.render("home",{homeLorem:homeStartingContent,posts:posts});
})
app.get("/about",function(req,res){
  res.render("about",{aboutLorem:aboutContent});
})
app.get("/contact",function(req,res){
  res.render("contact",{contactLorem:contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose");
})


app.get("/posts/:topic",function(req,res){

  console.log("New Post Title : "+req.params.topic);
  posts.forEach(function(element){
    if(_.lowerCase(element.title)===_.lowerCase(req.params.topic)){
      res.render("post",{post:element.post,title:element.title});
    }
  });
});

app.post("/compose",function(req,res){
  let postObject={ 
    post:req.body.post,
    title:req.body.title
  };
  posts.push(postObject);
  res.redirect("/");
})
