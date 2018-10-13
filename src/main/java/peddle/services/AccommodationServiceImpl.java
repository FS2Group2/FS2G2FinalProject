package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.dto.AccommodationDto;
import peddle.entities.Accommodation;
import peddle.entities.City;
import peddle.repository.AccommodationRepository;
import peddle.repository.CityRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccommodationServiceImpl implements AccommodationService {

  @Autowired
  private AccommodationRepository accommodationRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private CityRepository cityRepository;

  @Override
  public List<AccommodationDto> getByCityName(String cityName) {
    City city = cityRepository.findByName(cityName).get();
    List<Accommodation> accommodations = accommodationRepository.findByCity(city);
    List<AccommodationDto> accommodationDtos = accommodations.stream()
            .map(accommodation -> modelMapper.map(accommodation, AccommodationDto.class))
            .collect(Collectors.toList());
    return accommodationDtos;
  }
}
