package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.dto.AccommodationDto;
import peddle.repository.AccommodationRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {

  @Autowired
  private AccommodationRepository accommodationRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<AccommodationDto> getByCity_Name(String cityName) {
    List<AccommodationDto> accommodationDtos = new ArrayList<>();
    accommodationRepository.findAccommodationsByCity_Name(cityName)
                    .forEach(accommodation -> accommodationDtos
                    .add(modelMapper.map(accommodation, AccommodationDto.class)));
    return  accommodationDtos;
  }
}
