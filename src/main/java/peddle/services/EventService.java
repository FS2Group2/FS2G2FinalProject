package peddle.services;

import peddle.DTO.EventDTO;
import peddle.entities.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
  List<EventDTO> getAll();
}
