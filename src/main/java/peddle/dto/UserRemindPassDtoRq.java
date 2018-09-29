package peddle.dto;

import lombok.Data;

@Data
public class UserRemindPassDtoRq {
  private String email;
  private String password;
  private String token;
}
