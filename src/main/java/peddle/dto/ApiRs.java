package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiRs {
  private String message;

  public ApiRs(String message) {
    this.message = message;
  }
}
