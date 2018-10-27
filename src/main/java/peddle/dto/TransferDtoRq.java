package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
public class TransferDtoRq {
  private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

  private String cityFrom;
  private String cityTo;
  private String dateFrom;
  private String dateTo;

  public Date getDateFromConverted() throws ParseException {
    return dateFormat.parse(this.dateFrom);
  }

  public Date getDateToConverted() throws ParseException {
    return dateFormat.parse(this.dateTo);
  }

}
