package peddle.dto;

import lombok.Data;

@Data
public class UserLoginDtoRq {
  private String name;
  private String password;
}
