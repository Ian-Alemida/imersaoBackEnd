import * as multer from "multer";

declare global {
  namespace Express {
    interface MulterFile {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    }

    interface Request {
      file?: MulterFile; // Adiciona a propriedade `file`
      files?: MulterFile[]; // Caso suporte múltiplos uploads
    }
  }
}