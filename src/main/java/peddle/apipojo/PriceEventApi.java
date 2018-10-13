package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class PriceEventApi {
  @JsonProperty("type")
  private String type;

  @JsonProperty("currency")
  private String currency;

  @JsonProperty("min")
  private float min;

  @JsonProperty("max")
  private float max;

  public PriceEventApi() {
    this.type = "";
    this.currency = "";
    this.min = 0;
    this.max = 0;
  }

  @Override
  public String toString() {
    return "Type = " + type
            + ", Min price = " + min + " " + currency
            + ", Max price = " + max + " " + currency;
  }
}
