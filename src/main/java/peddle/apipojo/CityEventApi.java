package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class CityEventApi {

  @JsonProperty("name")
  private String name;

  public CityEventApi() {
    this.name = "";
  }

  @Override
  public String toString() {
    return "City = " + name;
  }
}
