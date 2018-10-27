package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
public class EventDtoRq {
  private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

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
}
