package peddle.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class EventFilterDto {
  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

  private int page;
  private int pageSize;
  private String cityName;
  private String dateStart;
  private String dateFin;

  public int getPage() {
    return page;
  }

  public int getPageSize() {
    return pageSize;
  }

  public String getCityName() {
    return cityName;
  }

  public String getDateStart() {
    return dateStart;
  }

  public String getDateFin() {
    return dateFin;
  }
}
