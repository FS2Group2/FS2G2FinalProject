package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserRemindPassDtoRq {
  private String email;
  private String password;
  private String token;
}
