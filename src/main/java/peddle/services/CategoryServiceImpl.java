package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.configuration.ErrorConstants;
import peddle.dto.CategoryDto;
import peddle.dto.EventDtoRs;
import peddle.entities.Category;
import peddle.entities.Event;
import peddle.repository.CategoryRepository;
import peddle.repository.EventRepository;
import peddle.utils.DateOperationUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private EventRepository eventRepository;

  @Override
  public List<CategoryDto> getAll() {
    List<CategoryDto> categoryDtos = new ArrayList<>();
    categoryRepository.findAll().forEach(category -> {
      Long countEvent = eventRepository.countByCategory(category);
      CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
      categoryDto.setCount(countEvent);
      categoryDtos.add(categoryDto);
    });
    return categoryDtos;
  }

  @Override
  public List<CategoryDto> getAllFromCurrentDate() {
    List<CategoryDto> categoriesDto = new ArrayList<>();
    Date currentDate = DateOperationUtils.getCurrentDate();
    currentDate = DateOperationUtils.addDays(currentDate, -1);
    Date finalCurrentDate = currentDate;
    categoryRepository.findAll().forEach(category -> {
      Long countEvent = eventRepository.countByCategoryAndDateIsAfter(category, finalCurrentDate);
      CategoryDto categoryDto = modelMapper.map(category, CategoryDto.class);
      categoryDto.setCount(countEvent);
      categoriesDto.add(categoryDto);
    });
    return categoriesDto;
  }

}
