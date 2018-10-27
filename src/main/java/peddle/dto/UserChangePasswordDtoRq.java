package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserChangePasswordDtoRq {
  private Long userId;
  private String oldPassword;
  private String newPassword;
}
