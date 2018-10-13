package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ClassificationsApi {
  @JsonProperty("primary")
  private boolean primary;

  @JsonProperty("segment")
  private SegmentApi segment;

  @Override
  public String toString() {
    String result = "";
    if (segment != null) {
      result = segment.toString();
    }
    return result;
  }
}
