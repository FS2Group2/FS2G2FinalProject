package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class UserEventDto implements Serializable {
  private Long userId;
  private Long eventId;
}
