package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class VenueEventApi {

  @JsonProperty("city")
  private CityEventApi city;

  @JsonProperty("country")
  private CountryEventApi country;

  @Override
  public String toString() {
    String result = "";
    if (country != null) {
      result = country.toString();
    }
    if (city != null) {
      result += ", " + city.toString();
    }
    return result;
  }
}
