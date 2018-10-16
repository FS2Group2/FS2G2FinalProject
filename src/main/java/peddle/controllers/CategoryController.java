package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.CategoryDto;
import peddle.services.CategoryService;
import peddle.utils.DateOperationUtils;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

  @Autowired
  CategoryService categoryService;

  @GetMapping("/categories/all")
  public List<CategoryDto> getAllCategories() {
    //List<CategoryDto> categoryDtos = categoryService.getAll();
    List<CategoryDto> categoryDtos = categoryService.getAllFromCurrentDate();
    return categoryDtos;
  }

}
