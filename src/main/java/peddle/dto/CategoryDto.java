package peddle.dto;

import lombok.Data;

@Data
public class CategoryDto {
  private Long id;
  private String name;
  private int count;
  private String photo;
}
