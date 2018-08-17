package peddle.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import peddle.entities.City;
import peddle.entities.Event;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class EventDto {
  private Long id;
  private String name;
  private String cityName;
  private Date date;
  private int duration;
  private int price;
}
