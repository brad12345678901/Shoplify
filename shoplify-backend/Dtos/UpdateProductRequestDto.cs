using System.ComponentModel.DataAnnotations;

namespace shoplify_backend.Dtos;

public record class UpdateProductRequestDto(
    [Required] [StringLength(100, MinimumLength = 3)] string Name,
    [Required] [StringLength(20)] string Type,
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Please Select a Valid Category.")]
        int Category,
    [Required] [MinLength(10)] string Description,
    [Required] [Range(0.01, 100000.00)] decimal Price,
    [Required(ErrorMessage = "Stock must be a number, if empty put 0")] [Range(0, int.MaxValue, ErrorMessage = "Stock must not be negative")] int Stock
);
