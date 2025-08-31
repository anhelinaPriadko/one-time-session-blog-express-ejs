import express from "express";
import bodyParser from "body-parser";
import { body, validationResult, checkSchema } from "express-validator";
import { postValidationSchema } from "./utilities/validationSchemas.mjs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

function Post(id, title, content, creationDate) {
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

app.post("/createPost", checkSchema(postValidationSchema), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.render("createPost.ejs", {
      errors: errors.array(),
      oldInput: req.body,
     });
  }  

   let date = new Date();
   let id = posts.length;

   let newPost = new Post(id, req.body.title, req.body.content, date);

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
