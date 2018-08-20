package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import peddle.dto.AccommodationDto;
import peddle.services.AccommodationService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccommodationController {

  @Autowired
  private AccommodationService accommodationService;

  @PostMapping("/accommodations/city/{cityName}")
  @ResponseBody
  public List<AccommodationDto> getAccommodations(@PathVariable String cityName) {
    List<AccommodationDto> result = accommodationService.getByCityName(cityName);
    return result;
  }
}
