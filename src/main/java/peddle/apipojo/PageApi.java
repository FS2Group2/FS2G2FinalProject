package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class PageApi {

  @JsonProperty("size")
  private int size;

  @JsonProperty("totalElements")
  private int totalElements;

  @JsonProperty("totalPages")
  private int totalPages;

  @JsonProperty("number")
  private int number;

  public PageApi() {
    this.size = 0;
    this.totalElements = 0;
    this.totalPages = 0;
    this.number = 0;
  }

  @Override
  public String toString() {
    return "Page size = " + size
        + ", Page number = " + number
        + ", Total pages = " + totalPages
        + ", Total elements = " + totalElements;
  }
}
