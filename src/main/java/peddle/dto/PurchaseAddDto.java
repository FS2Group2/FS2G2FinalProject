package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PurchaseAddDto {
  private Long id;
  private Long eventId;
  private Long transfertoId;
  private Long transferfromId;
  private Long accommodationId;
  private Long translatorId;
  private Boolean photographer;
}
