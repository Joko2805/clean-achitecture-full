import { UploadedFile } from "express-fileupload";
import { IFileUploadProvider } from "../../domain/providers/upload-file.provider";
import path from "path";
import fs from "fs";

export class FileUploadProvider implements IFileUploadProvider {
  private FOLDER_UPLOAD_PATH = path.join(__dirname, "../../../", "upload");

  constructor() {
    if (!fs.existsSync(this.FOLDER_UPLOAD_PATH))
      fs.mkdirSync(this.FOLDER_UPLOAD_PATH);
  }

  async uploadFile(
    file: any,
    validExtension: string[],
    folder: string
  ): Promise<void> {
    const { mimetype, mv, name } = file as UploadedFile;
    const ext = mimetype.split("/").at(1) ?? "";

    if (!validExtension.includes(ext)) {
      throw new Error("Extension not valid");
    }

    const filePath = path.join(this.FOLDER_UPLOAD_PATH, folder, name);

    if (!fs.existsSync(path.join(this.FOLDER_UPLOAD_PATH, folder))) {
      fs.mkdirSync(path.join(this.FOLDER_UPLOAD_PATH, folder));
    }

    mv(filePath);
  }
}
