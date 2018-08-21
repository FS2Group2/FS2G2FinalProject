package peddle.dto;

import lombok.Data;

@Data
public class AccommodationDto {
  private Long id;
  private String name;
  private int price;
  private int minOrderTime;

}
