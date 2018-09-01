package peddle.dto;

import lombok.Data;

@Data
public class UserAddDtoRq {
  private String name;
  private String firstName;
  private String lastName;
  private String email;
  private Long city;
  private Long role;
  private String password;
}
