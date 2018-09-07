package peddle.services;

import peddle.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
  List<CategoryDto> getAll();
}
