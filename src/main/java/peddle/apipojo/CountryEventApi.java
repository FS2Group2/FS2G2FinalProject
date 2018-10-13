package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class CountryEventApi {

  @JsonProperty("name")
  private String name;

  public CountryEventApi() {
    this.name = "";
  }

  @Override
  public String toString() {
    return "Country = " + name;
  }

}
