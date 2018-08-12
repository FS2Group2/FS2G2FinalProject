package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import peddle.DTO.EventDTO;
import peddle.entities.Event;
import peddle.services.EventServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/event")
  public class EventController {

  @Autowired
  private EventServiceImpl eventService;

  @RequestMapping(path = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<EventDTO> getAllEvents(){
    List<EventDTO> events = eventService.getAll();
    return events;
  }

  /*
  @GetMapping("/api/event/{id}")
  public Optional<Event> getEvent(@PathVariable("id") Long id){
    Optional<Event> event = eventService.getById(id);
    return event;
  }
  */
}
