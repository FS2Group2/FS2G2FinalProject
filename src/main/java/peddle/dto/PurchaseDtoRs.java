package peddle.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PurchaseDtoRs {
  private Long id;

  private Long eventId;
  private String eventName;
  private String eventCityName;
  private Date eventDate;
  private int eventPrice;

  private Long transfertoId;
  private String transfertoTransporttypeName;
  private String transfertoFromcityName;
  private String transfertoTocityName;
  private int transfertoNumber;
  private Date transfertoDeparttime;
  private int transferToPrice;

  private Long transferfromId;
  private String transferfromTransporttypeName;
  private String transferfromFromcityName;
  private String transferfromTocityName;
  private int transferfromNumber;
  private Date transferfromDeparttime;
  private int transferfromPrice;

  private Long accommodationId;
  private String accommodationName;
  private String accommodationCityName;
  private int accommodationPrice;

  /*
   private Transfer transferTo;
  private Transfer transferfrom;
  private Accommodation accommodation;
   */

  private int summ;

  public int getEventPrice() {
    return eventPrice;
  }

  public int getTransferToPrice() {
    return transferToPrice;
  }

  public int getTransferfromPrice() {
    return transferfromPrice;
  }

  public int getAccommodationPrice() {
    return accommodationPrice;
  }

  public void setSumm(int summ) {
    this.summ = summ;
  }
}
/*
@Data
class Accommodation {
  private Long id;
  private String name;
  private String cityName;
  private int price;
}

@Data
class Transfer {
  private Long id;
  private String transportTypeName;
  private String fromcityName;
  private String toCityName;
  private int number;
  private Date departTime;
  private int price;
}
*/