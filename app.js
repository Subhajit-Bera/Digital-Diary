const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Digital Diary is your personal digital sanctuary where you can pour your heart out, document your life journey, and record the moments that matter most. With our intuitive and user-friendly platform, you can write and organize your entries with ease.";
const aboutContent = "We are thrilled to be part of your journey, and we look forward to being your trusted companion as you write the story of your life. Your digital diary is your canvas, and we are here to empower you to paint it with your words, emotions, and memories.Feel free to explore our platform, start your digital diary, and take the first step toward capturing the essence of your life.Thank you for choosing us as your digital diary companion!";
const contactContent = "We value your feedback and are here to assist you with any questions, concerns, or inquiries you may have. Feel free to reach out to us through the following contact methods:";

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

    Post.find({}, function (err, posts) {
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });
    });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });


    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});

app.get("/posts/:postId", function (req, res) {

    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });

});


app.get("/about", function (req, res) {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactContent });
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});