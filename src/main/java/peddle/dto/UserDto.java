package peddle.dto;

import java.io.Serializable;
import java.util.List;

public class UserDto implements Serializable {

  private String name;

  private String email;

  private List<EventDtoRs> events;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public List<EventDtoRs> getEvents() {
    return events;
  }

  public void setEvents(List<EventDtoRs> events) {
    this.events = events;
  }

  @Override
  public String toString() {
    return "UserDto{" + "name='" + name + '\'' + ", email='" + email + '\'' + ", events=" + events + '}';
  }
}
