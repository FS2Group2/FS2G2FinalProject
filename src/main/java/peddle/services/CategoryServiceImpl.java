package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.dto.CategoryDto;
import peddle.repository.CategoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<CategoryDto> getAll() {
    List<CategoryDto> categoryDtos = new ArrayList<>();
    categoryRepository.findAll().forEach(category ->
            categoryDtos.add(modelMapper.map(category, CategoryDto.class)));
    return categoryDtos;
  }
}
