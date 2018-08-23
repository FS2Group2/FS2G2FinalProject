package peddle.dto;

import lombok.Data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class TransferDtoRq {
  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

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

  public String getCityFrom() {
    return cityFrom;
  }

  public String getCityTo() {
    return cityTo;
  }
}
