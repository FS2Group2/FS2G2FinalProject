package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ImageApi {

  @JsonProperty("url")
  private String url;

  @JsonProperty("width")
  private int width;

  @JsonProperty("height")
  private int height;

  public ImageApi() {
    this.url = "";
    this.width = 0;
    this.height = 0;
  }

  @Override
  public String toString() {
    return "width = " + width
            + ", height = " + height
            + ", URL = " + url;
  }
}
