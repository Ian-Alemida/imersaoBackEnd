import "dotenv/config";
export declare function getTodosPosts(): Promise<any>;
interface novoPostInterface {
    descricao: string;
    ImgUrl: string;
}
export declare function criarPost(novoPost: novoPostInterface): Promise<any>;
export declare function atualizarPost(id: string, novoPost: novoPostInterface): Promise<any>;
export declare function excluirPost(id: string): Promise<any>;
export {};
