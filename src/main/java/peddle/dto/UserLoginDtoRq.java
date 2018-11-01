package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginDtoRq {
  private String name;
  private String password;
  private boolean isRemembered;
}
