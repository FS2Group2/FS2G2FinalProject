package peddle.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDtoRs {
  private Long id;
  private String name;
  private String email;
  private String cityName;
  private String roleName;
  private String profilePhoto;
  private String profileInfo;
  private List<PurchaseDtoRs> purchases;
  private List<EventFullDtoRs> events;
}
