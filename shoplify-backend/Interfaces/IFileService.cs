using System;

namespace shoplify_backend.Interfaces;

public interface IFileService
{
    Task<(string location, string fileName)> SaveFileAsync(
        IFormFile file,
        string subFolder,
        int id
    ) => SaveFileAsync(file, subFolder, id, Path.GetFileNameWithoutExtension(file.FileName));
    Task<(string location, string fileName)> SaveFileAsync(
        IFormFile file,
        string subFolder,
        int id,
        string customFileName
    );
    void DeleteFile(string fileName, string subFolder, int id);
}
