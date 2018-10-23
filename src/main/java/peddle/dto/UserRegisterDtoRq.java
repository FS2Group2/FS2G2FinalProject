package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRegisterDtoRq {
  private String name;
  private String email;
  private String password;
}
