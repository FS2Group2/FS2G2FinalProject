package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserUpdateDtoRq {
  private Long userId;
  private String name;
  private String firstName;
  private String lastName;
  private String email;
  private Long city;
  private Long role;
  private String profileCityLiving;
  private String profilePhoto;
  private String profileInfo;
}
