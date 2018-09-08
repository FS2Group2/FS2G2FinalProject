package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import peddle.dto.EventDtoRs;
import peddle.dto.EventDtoRq;
import peddle.dto.EventFullDtoRs;
import peddle.dto.PageDtoRq;
import peddle.services.CategoryService;
import peddle.services.EventServiceImpl;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

  @Autowired
  private EventServiceImpl eventService;

  @RequestMapping(path = "/all", method = RequestMethod.GET,
          produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<EventDtoRs> getAllEvents() {
    List<EventDtoRs> events = eventService.getAllByPage(0, 12);
    return events;
  }

  @PostMapping(path = "/page")
  @ResponseBody
  public List<EventDtoRs> getEventsPage(@RequestBody PageDtoRq pageDtoRq) {
    List<EventDtoRs> events = eventService.getAllByPage(pageDtoRq.getPage(), pageDtoRq.getPageSize());
    return events;
  }

  @PostMapping(path = "/filter")
  @ResponseBody
  public List<EventDtoRs> getEventsFilter(@RequestBody EventDtoRq eventDtoRq) throws ParseException {
    List<EventDtoRs> events = eventService.getByFilter(eventDtoRq);
    return events;
  }

  @GetMapping(path = "/info/{id}")
  @ResponseBody
  public EventFullDtoRs getById(@PathVariable("id") Long id) {
    EventFullDtoRs event = eventService.getById(id);
    return event;
  }

  @GetMapping(path = "/bycategory/{id}")
  @ResponseBody
  public List<EventDtoRs> getEventsByCategoryId(@PathVariable("id") Long id) {
    return eventService.getEventsByCategoryId(id);
  }

}
