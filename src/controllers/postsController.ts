import { Request, Response } from "express"
import {
  getTodosPosts,
  criarPost,
  atualizarPost,
  excluirPost,
  postInterface,
} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
// Adiciona o 'file'  do Multer a  tipagem do request             

export async function listarPosts(req: Request, res: Response): Promise<void>{
  try{
    // Chama a função para buscar os posts
    const posts: postInterface[] = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
  } catch (erro: any) {
    console.error(erro.message);
    res.status(500).json({Erro: erro.message});
  }
}

export async function postarNovoPost(req: Request, res: Response) {
  const novoPost: Omit<postInterface, "_id"> = req.body;
  try {
    const postCriado: InsertOneResult<postInterface> = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro: any) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req: Request, res: Response): Promise<void> {
  const novoPost: Omit<postInterface, "_id"> = {
    descricao: "",
    ImgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const postCriado: InsertOneResult<postInterface> = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (erro: any) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function atualizarNovoPost(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post: Partial<postInterface>  = {
      ImgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado: UpdateResult = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro: any) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function apagarPost(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    await excluirPost(id);
    res.status(200).json(`Post com id '${id}' foi deletado com sucesso$`);
  } catch (erro: any) {
    console.error(erro.message);
    res.status(500).json({ Erro: erro.message });
  }
}