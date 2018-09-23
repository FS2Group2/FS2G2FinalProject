package peddle.dto;

import lombok.Data;

@Data
public class ApiRs {
  private boolean success;
  private String massage;


  public ApiRs(boolean success, String massage) {
    this.success = success;
    this.massage = massage;
  }
}
