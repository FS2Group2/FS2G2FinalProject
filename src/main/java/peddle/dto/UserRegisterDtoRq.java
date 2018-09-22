package peddle.dto;

import lombok.Data;

@Data
public class UserRegisterDtoRq {
  private String name;
  private String email;
  private String password;
}
