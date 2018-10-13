package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class EventsApi {
  @JsonProperty("events")
  private List<EventApi> eventApiList;

  @Override
  public String toString() {
    String result = "";
    for (EventApi event:eventApiList) {
      result += event.toString() + "\n";
    }
    return  result;
  }
}
