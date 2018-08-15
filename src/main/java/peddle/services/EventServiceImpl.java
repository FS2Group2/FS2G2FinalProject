package peddle.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.dto.EventDto;
import peddle.repository.EventRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

  @Autowired
  private EventRepository eventRepository;

  @Override
  public List<EventDto> getAll() {
    List<EventDto> eventsDto = new ArrayList<>();
    eventRepository.findAll().forEach(event -> eventsDto.add(new EventDto(event)));
    return eventsDto;
  }
}
