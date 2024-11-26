import { getTodosPosts, criarPost } from "../models/postsModels.js";
import fs from "fs";

export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

export async function PostarNovoPost(req, res) {
  const NovoPost = req.body;
  try {
    const postCriado = await criarPost(NovoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: erro });
  }
}

export async function uploadImagem(req, res) {
  const NovoPost = {
    descricao: "",
    imgUrl: req.file.originalaname,
    alt: "",
  };
  try {
    const postCriado = await criarPost(NovoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.jpeg`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
