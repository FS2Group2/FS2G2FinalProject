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
  private Long cityId;
  private Date dateStart;
  private Date dateFin;

  public EventFilterDto(int page, int pageSize, Long cityId, Date dateStart, Date dateFin) {
    this.page = page;
    this.pageSize = pageSize;
    this.cityId = cityId;
    this.dateStart = dateStart;
    this.dateFin = dateFin;
  }

  public int getPage() {
    return page;
  }

  public int getPageSize() {
    return pageSize;
  }

  public Long getCityId() {
    return cityId;
  }

  public Date getDateStart() {
    return dateStart;
  }

  public Date getDateFin() {
    return dateFin;
  }
}
