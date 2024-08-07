export interface IFileUploadProvider {
  uploadFile(
    file: any,
    validExtension: string[],
    folder: string
  ): Promise<void>;
}
