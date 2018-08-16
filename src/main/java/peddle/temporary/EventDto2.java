package peddle.temporary;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class EventDto2 {
  private Long id;
  private String name;
  private String cityName;
  private Date date;
  private String owner;
  private int duration;
  private int price;
}
