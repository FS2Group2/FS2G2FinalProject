package peddle.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.DTO.EventDTO;
import peddle.entities.Event;
import peddle.repository.EventRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

  @Autowired
  private EventRepository eventRepository;

  @Override
  public List<EventDTO> getAll() {
    List<EventDTO> eventDTOs = new ArrayList<>();
    eventRepository.findAll().forEach(event -> eventDTOs.add(new EventDTO(event)));
    return eventDTOs;
  }
}
