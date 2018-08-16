package peddle.temporary;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.dto.EventDto;
import peddle.entities.Event;
import peddle.repository.EventRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl2 {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private ModelMapper modelMapper;

  public List<EventDto2> getAll() {
    List<EventDto2> eventsDto = new ArrayList<>();
    eventRepository.findAll().forEach(event -> eventsDto.add(modelMapper.map(event, EventDto2.class)));
    return eventsDto;
  }
}
