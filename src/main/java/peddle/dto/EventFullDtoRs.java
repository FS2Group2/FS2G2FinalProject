package peddle.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class EventFullDtoRs {
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
