package peddle.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserEventDto implements Serializable {

  private Long userId;

  private Long eventId;
}
