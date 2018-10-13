package peddle.apipojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class EventApi {

  @JsonProperty("name")
  private String name;

  @JsonProperty("type")
  private String type;

  @JsonProperty("id")
  private String id;

  @JsonProperty("url")
  private String url;

  @JsonProperty("locale")
  private String locale;

  @JsonProperty("images")
  private List<ImageApi> imageApiList;

  @JsonProperty("dates")
  private DatesEventApi datesEvent;

  @JsonProperty("classifications")
  private List<ClassificationsApi> classifications;

  @JsonProperty("priceRanges")
  private List<PriceEventApi> priceEvent;

  @JsonProperty("_embedded")
  private VenuesEventApi venuesEvent;

  public EventApi() {
    this.name = "";
    this.type = "";
    this.id = "";
    this.url = "";
    this.locale = "";
  }

  @Override
  public String toString() {
    String result = "Name = " + name
        + ", Type = " + type
        + ", Id = " + id
        + ", URL = " + url
        + "\nLocale = " + locale + ", ";

    if (classifications != null) {
      result += "\nSegment =" + classifications.toString() + ", ";
    }
    if (venuesEvent != null) {
      result += venuesEvent.toString();
    }

    if (datesEvent != null) {
      result += datesEvent.toString();
    }

    if (priceEvent != null) {
      for (PriceEventApi price : priceEvent) {
        result += "\n" + price.toString();
      }
    }

    if (imageApiList != null) {
      result += "\n"  + "Images:";
      for (ImageApi image : imageApiList) {
        result += "\n" + image.toString();
      }
    }

    return result;
  }
}
