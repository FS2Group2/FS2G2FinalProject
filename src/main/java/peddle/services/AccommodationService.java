package peddle.services;

import peddle.dto.AccommodationDto;

import java.util.List;

public interface AccommodationService {
  List<AccommodationDto> getByCity_Name(String cityName);
}
