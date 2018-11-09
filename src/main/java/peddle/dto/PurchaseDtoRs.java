package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class PurchaseDtoRs {
  private Long id;

  private Long eventId;
  private String eventName;
  private String eventCityName;
  private Date eventDate;
  private int eventPrice;
  private Long categoryId;
  private String categoryName;

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

  private Long translatorId;
  private String translatorLanguage;

  private Boolean photographer;

  private int summ;
}