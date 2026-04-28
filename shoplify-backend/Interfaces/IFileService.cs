using System;

namespace shoplify_backend.Interfaces;

public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file, string subFolder) =>
        SaveFileAsync(file, subFolder, Path.GetFileNameWithoutExtension(file.FileName));
    Task<string> SaveFileAsync(IFormFile file, string subFolder, string customFileName);
    void DeleteFile(string fileName, string subFolder);
}
