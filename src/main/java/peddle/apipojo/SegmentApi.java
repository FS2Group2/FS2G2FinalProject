package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class SegmentApi {
  @JsonProperty("id")
  private String id;

  @JsonProperty("name")
  private String name;

  public SegmentApi() {
    this.id = "";
    this.name = "";
  }

  @Override
  public String toString() {
    return name;
  }

}
