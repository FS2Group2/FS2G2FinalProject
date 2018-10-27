package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class TransferDtoRs {
  private Long id;
  private String transportTypeName;
  private int number;
  private int price;
  private Date departTime;
  private int duration;
  private String fromCityName;
  private String toCityName;
}
