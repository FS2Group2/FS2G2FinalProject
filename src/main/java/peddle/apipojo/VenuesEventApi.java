package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class VenuesEventApi {
  @JsonProperty("venues")
  private List<VenueEventApi> venues;

  @Override
  public String toString() {
    String result = "";
    if (venues != null) {
      for (VenueEventApi venue:venues) {
        result += venue.toString() + "\n";
      }
    } else {
      result += "\n";
    }
    return result;
  }
}
