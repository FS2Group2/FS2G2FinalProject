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
  private String city;
  private Date date;
  private String owner;
  private int duration;
  private int price;

  public EventDto(Event event) {
    this.id = event.getId();
    this.name = event.getName();
    this.date = event.getDate();
    this.owner = "none";
    this.duration = event.getDuration();
    this.price = event.getPrice();

    City city = event.getCity();
    if (city != null) {
      this.city = city.getName();
    } else {
      this.city = "";
    }
  }
}
