package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DatesEventApi {
  @JsonProperty("start")
  private StartEventApi startEvent;

  @JsonProperty("timezone")
  private String timezone;

  public DatesEventApi() {
    this.timezone = "";
  }

  @Override
  public String toString() {
    String start = "";
    if (startEvent != null) {
      start = startEvent.toString();
    }
    return start + ", Timezone = " + timezone;
  }
}
