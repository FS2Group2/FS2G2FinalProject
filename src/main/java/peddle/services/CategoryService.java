package peddle.services;

import peddle.dto.CategoryDto;
import peddle.dto.EventDtoRs;
import peddle.entities.Event;

import java.util.List;

public interface CategoryService {

  List<CategoryDto> getAll();

  List<CategoryDto> getAllFromCurrentDate();

}
