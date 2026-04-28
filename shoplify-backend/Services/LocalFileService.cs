using System;
using System.Text.RegularExpressions;
using shoplify_backend.Interfaces;

namespace shoplify_backend.Services;

public partial class LocalFileService : IFileService
{
    private readonly string _basePath;

    public LocalFileService()
    {
        _basePath = Path.Combine(Directory.GetCurrentDirectory(), "Storage");
    }

    public async Task<string> SaveFileAsync(IFormFile file, string subFolder, string customFileName)
    {
        if (file == null)
            return "";

        var folderPath = Path.Combine(_basePath, subFolder);

        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        var cleanCustomFileName = WhiteSpaceRegex().Replace(customFileName, "").ToLower();
        var fileName = $"{cleanCustomFileName}_{Guid.NewGuid()}.png";
        var filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return fileName;
    }

    public void DeleteFile(string fileName, string subFolder)
    {
        var path = Path.Combine(_basePath, subFolder, fileName);
        if (File.Exists(path))
            File.Delete(path);
    }

    [GeneratedRegex(@"\s")]
    private static partial Regex WhiteSpaceRegex();
}
