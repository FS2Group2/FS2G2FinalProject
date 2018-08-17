package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import peddle.dto.EventDto;
import peddle.dto.EventFilterDto;
import peddle.dto.PageDto;
import peddle.services.EventServiceImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

  @Autowired
  private EventServiceImpl eventService;

  @RequestMapping(path = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<EventDto> getAllEvents() {
    List<EventDto> events = eventService.getAllByPage(0,30);
    return events;
  }

  @PostMapping(path = "/page")
  @ResponseBody
  public List<EventDto> getEventsPage(@RequestBody PageDto pageDto) {
    List<EventDto> events = eventService.getAllByPage(pageDto.getPage(), pageDto.getPageSize());
    return events;
  }

  @PostMapping(path = "/filter")
  @ResponseBody
  public List<EventDto> getEventsFilter(@RequestBody EventFilterDto eventFilterDto) throws ParseException {
//    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
//    Date dateStart = simpleDateFormat.parse("16-08-2018");
//    Date dateFin = simpleDateFormat.parse("20-08-2018");

    List<EventDto> events = eventService.getByCity(eventFilterDto);
    return events;
  }

  /*
  {
    "page":"1",
    "pageSize":"5",
    "cityId": "2",
    "dateStart":"16-08-2018",
    "dateFin":"20-08-2018"
  }

  @GetMapping("/api/event/{id}")
  public Optional<Event> getEvent(@PathVariable("id") Long id){
    Optional<Event> event = eventService.getById(id);
    return event;
  }
  */
}
