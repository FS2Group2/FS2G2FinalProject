package peddle.dto;

import lombok.Data;

@Data
public class UserChangePasswordDtoRq {
  private Long userId;
  //private String name;
  private String oldPassword;
  private String newPassword;
}
