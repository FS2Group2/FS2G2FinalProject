package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.CityDto;
import peddle.services.CityServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/city")
public class CityController {
  @Autowired
  private CityServiceImpl cityService;

  @RequestMapping(path = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<CityDto> getAll() {
    List<CityDto> cities = cityService.getAll();
    return cities;
  }

}
