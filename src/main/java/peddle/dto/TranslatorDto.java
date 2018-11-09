package peddle.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TranslatorDto {
  private Long id;
  private String language;
}
