import express from "express";
import multer from "multer";
import {
  listarPosts,
  PostarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ dest: "./uploads", storage });

function routes(app) {
  app.use(express.json());

  app.get("/posts", listarPosts);

  app.post("/posts", PostarNovoPost);
  app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;
