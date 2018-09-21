package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class EventDtoRs {
  private Long id;
  private String name;
  private String cityName;
  private Date date;
  private Long categoryId;
  private String categoryName;
  private int duration;
  private int price;
  private String eventExtraPhoto;
  private String eventExtraDescription;
}
