package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class StartEventApi {
  @JsonProperty("localDate")
  private String localDate;

  @JsonProperty("localTime")
  private String localTime;

  @JsonProperty("dateTime")
  private String dateTime;

  public StartEventApi() {
    this.localDate = "";
    this.localTime = "";
    this.dateTime = "";
  }

  @Override
  public String toString() {
    return "LocalDate = " + localDate
            + ", LocalTime = " + localTime
            + ", DateTime = " + dateTime;
  }
}
