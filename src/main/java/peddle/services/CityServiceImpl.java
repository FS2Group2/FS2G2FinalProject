package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import peddle.dto.CityDto;
import peddle.repository.CityRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityServiceImpl implements CityService {

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<CityDto> getAll() {
    List<CityDto> cityDto = new ArrayList<>();

    cityRepository.findAll(Sort.by("name")).forEach(city -> cityDto.add(modelMapper.map(city, CityDto.class)));
    return cityDto;
  }

}
