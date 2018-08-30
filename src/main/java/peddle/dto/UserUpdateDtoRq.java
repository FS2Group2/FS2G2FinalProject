package peddle.dto;

import lombok.Data;

@Data
public class UserUpdateDtoRq {
  private Long id;
  private String name;
  /*
  private String firstName;
  private String lastName;
  */
  private String email;
  private Long cityId;
  private String cityName;
  private Long roleId;
  private String roleName;
  private String profilePhoto;
  private String profileInfo;
}
