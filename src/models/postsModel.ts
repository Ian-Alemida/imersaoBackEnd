import "dotenv/config";
import { ObjectId, MongoClient } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao: MongoClient = await conectarAoBanco(process.env.STRING_CONEXAO!);
// Seleciona o banco de dados "imersao-instabytes"
const db = conexao.db("ImersaoAluraGoogle");
// Seleciona a coleção "posts" dentro do banco de dados
const colecao = db.collection("posts");

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  // Retorna um array com todos os documentos da coleção
  return colecao.find().toArray();
}

interface novoPostInterface {
  descricao: string
  ImgUrl: string
}
export async function criarPost(novoPost: novoPostInterface) {
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id: string, novoPost: novoPostInterface) {
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
export async function excluirPost(id: string) {
  const postId = ObjectId.createFromHexString(id);
  return colecao.deleteOne({ _id: new ObjectId(postId) });
}
