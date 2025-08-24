import express from "express";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

let posts = [];

function Post (id, title, content, creationDate){
  this.id = id;
  this.title = title;
  this.content = content;
  this.creationDate = creationDate;
}

app.get("/", (req, res) => {
    res.render("home.ejs", { posts: posts });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/posts", (req, res) => {
    res.render("posts.ejs", { posts: posts });
});

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

app.post("/createPost", 
  [
    body("title")
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),

    body("content")
      .trim()
      .isLength({ min: 20, max: 5000 })
      .withMessage("Content must be between 10 and 2000 characters"),
  ], 
  (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("createPost.ejs", {
        errors: errors.array(),
        oldInput: req.body,
      });
    }

    let date = new Date;
    let id = posts.length;

    let newPost = new Post (id, req.body.title, req.body.content, date);

    posts.push(newPost);
    res.render("posts.ejs", { posts: posts });
  });

 app.get("/posts/:postId", (req, res) => {

  let result = posts.find(({ id }) => id === Number(req.params.postId));

  res.render("post.ejs", { post: result });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});