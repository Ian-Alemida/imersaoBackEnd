import "dotenv/config";
import { ObjectId, MongoClient, Collection, InsertOneResult, UpdateResult, DeleteResult } from "mongodb"
import conectarAoBanco from "../config/dbConfig.js";

export interface postInterface {
  _id?: ObjectId;
  descricao: string;
  ImgUrl: string;
  alt?: string; 
}
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao: MongoClient = await conectarAoBanco(process.env.STRING_CONEXAO!);
// Seleciona o banco de dados
const db = conexao.db("ImersaoAluraGoogle");
// Seleciona a coleção "posts" dentro do banco de dados
const colecao: Collection<postInterface> = db.collection("posts");


// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts(): Promise<postInterface[]> {
  // Retorna um array com todos os documentos da coleção
  const listaDePosts = colecao.find().toArray();
  return listaDePosts;
}

export async function criarPost(novoPost: postInterface): Promise<InsertOneResult<postInterface>> {
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id: string, novoPost: Partial<postInterface>): Promise<UpdateResult> {
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
export async function excluirPost(id: string): Promise<DeleteResult> {
  const postId = ObjectId.createFromHexString(id);
  return colecao.deleteOne({ _id: new ObjectId(postId) });
}
