package peddle.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import peddle.entities.Category;
import peddle.entities.City;
import peddle.entities.Event;

import java.util.Date;

@Setter
@Getter
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
}
