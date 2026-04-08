using System.ComponentModel.DataAnnotations;

namespace shoplify_backend.Dtos;


//OLD DEPRECATED DTO, USE CreateItemRequestDto.cs INSTEAD
//STORED FOR JUST SOME HISTORY PURPOSES
public record class CreateItemDto(
    [Required] [StringLength(50)] string Name,
    [Required] [StringLength(20)] string Type,
    [Required] [StringLength(100)] string Description,
    [Range(1, 100)] decimal Price,
    int Stock
);
