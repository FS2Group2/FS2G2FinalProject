package peddle.dto;

import lombok.Data;

@Data
public class CategoryDto {
  private Long id;
  private String name;
  private Long count;
  private String photo;
}
