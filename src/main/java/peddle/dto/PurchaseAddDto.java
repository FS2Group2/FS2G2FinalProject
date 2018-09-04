package peddle.dto;

import lombok.Data;

@Data
public class PurchaseAddDto {

  private Long id;
  private Long eventId;
  private Long transfertoId;
  private Long transferfromId;
  private Long accommodationId;

}
