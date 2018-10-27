package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryDto {
  private Long id;
  private String name;
  private Long count;
  private String photo;
  private String icon;
}
