package peddle.dto;

import lombok.Data;

@Data
public class TransferDto {
  private Long id;
  private String transportTypeName;
  private int number;
  private int price;
  private int duration;
  private String fromCityName;
  private String toCityName;

}
