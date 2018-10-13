package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class FullEventsApi {
  @JsonProperty("_embedded")
  private EventsApi eventsApi;

  @JsonProperty("page")
  private PageApi pageApi;

  @Override
  public String toString() {
    return eventsApi.toString() + "\n" + pageApi.toString();
  }
}
