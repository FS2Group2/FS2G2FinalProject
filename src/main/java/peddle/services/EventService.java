package peddle.services;

import peddle.dto.EventDto;

import java.util.List;

public interface EventService {
  List<EventDto> getAll();
}
