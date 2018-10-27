package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserDtoRs {
  private Long id;
  private String name;
  private String firstName;
  private String lastName;
  private String email;
  private Long cityId;
  private String cityName;
  private Long roleId;
  private String roleName;
  private String profileCityLiving;
  private String profilePhoto;
  private String profileInfo;
}
