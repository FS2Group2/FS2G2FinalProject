package peddle.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class PageDtoRq {
  private int page;
  private int pageSize;

  public int getPage() {
    return page;
  }

  public int getPageSize() {
    return pageSize;
  }
}
