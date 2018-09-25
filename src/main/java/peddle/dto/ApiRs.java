package peddle.dto;

import lombok.Data;

@Data
public class ApiRs {
  private boolean success;
  private String message;


  public ApiRs(boolean success, String message) {
    this.success = success;
    this.message = message;
  }
}
