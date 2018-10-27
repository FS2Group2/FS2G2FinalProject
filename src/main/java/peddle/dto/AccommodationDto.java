package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccommodationDto {
  private Long id;
  private String name;
  private int price;
  private int minOrderTime;
}
