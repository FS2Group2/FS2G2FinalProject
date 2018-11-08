package peddle.services;

import peddle.dto.TranslatorDto;
import java.util.List;

public interface TranslatorService {
  List<TranslatorDto> getAll();
}
