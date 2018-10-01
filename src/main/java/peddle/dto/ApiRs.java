package peddle.dto;

import lombok.Data;

@Data
public class ApiRs {
  private String message;


  public ApiRs(String message) {
    this.message = message;
  }
}
