import express from "express";
import { listarPosts, PostarNovoPost } from "../controllers/postsController.js";

function routes(app) {
  app.use(express.json());

  app.get("/posts", listarPosts);

  app.post("/posts", PostarNovoPost);
}

export default routes;
