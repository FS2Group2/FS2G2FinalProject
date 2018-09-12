package peddle.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class EventDtoRq {
  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

  private int page;
  private int pageSize;
  private String cityName;
  private String dateStart;
  private String dateFin;
  private Long categoryId;

  public Date getDateStartConverted() throws ParseException {
    return dateFormat.parse(this.dateStart);
  }

  public Date getDateFinConverted() throws ParseException {
    return dateFormat.parse(this.dateFin);
  }

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
