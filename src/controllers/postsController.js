import { getTodosPosts, criarPost } from "../models/postsModels.js";

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
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
