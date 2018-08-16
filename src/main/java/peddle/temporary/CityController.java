package peddle.temporary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.CityDto;
import peddle.dto.EventDto;
import peddle.services.EventServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/map")
public class CityController {

  @Autowired
  private CityServiceImpl cityService;

  @Autowired
  private EventServiceImpl2 eventService;

  @RequestMapping(path = "/city", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<CityDto> getAllCities() {
    List<CityDto> cities = cityService.getAll();
    return cities;
  }

  @RequestMapping(path = "/event", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<EventDto2> getAllEvents() {
    List<EventDto2> events = eventService.getAll();
    return events;
  }

}
