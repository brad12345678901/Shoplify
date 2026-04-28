using System;
using System.Text.RegularExpressions;
using shoplify_backend.Interfaces;

namespace shoplify_backend.Services;

public partial class LocalImageFileService : IFileService
{
    private readonly string _basePath;

    public LocalImageFileService()
    {
        _basePath = Path.Combine(Directory.GetCurrentDirectory(), "Storage");
    }

    public async Task<(string location, string fileName)> SaveFileAsync(
        IFormFile file,
        string subFolder,
        int id,
        string customFileName
    )
    {
        if (file == null)
            return ("", "");

        var folderPath = Path.Combine(_basePath, subFolder, id.ToString());

        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        var cleanCustomFileName = WhiteSpaceRegex().Replace(customFileName, "").ToLower();
        var fileName = $"{cleanCustomFileName}_{Guid.NewGuid()}.png";
        var filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return ($"{subFolder}/{id}/{fileName}", fileName);
    }

    public void DeleteFile(string fileName, string subFolder, int id)
    {
        var path = Path.Combine(_basePath, subFolder, id.ToString(), fileName);
        if (File.Exists(path))
            File.Delete(path);
    }

    [GeneratedRegex(@"\s")]
    private static partial Regex WhiteSpaceRegex();
}
