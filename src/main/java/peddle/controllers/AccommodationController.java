package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.AccommodationDto;
import peddle.services.AccommodationServiceImpl;

import java.util.List;

@RestController
@RequestMapping("api/accommodation/city")
public class AccommodationController {

  @Autowired
  private AccommodationServiceImpl accommodationService;

  @PostMapping(path = "/cityName")
  @ResponseBody
  public List<AccommodationDto> getAccommodations(@RequestBody AccommodationDto accommodationDto) {
    List<AccommodationDto> dtos = accommodationService
            .getByCity_Name(accommodationDto.toString());
    return dtos;
  }
}
