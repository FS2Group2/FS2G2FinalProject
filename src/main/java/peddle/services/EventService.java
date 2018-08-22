package peddle.services;

import peddle.dto.EventDtoRs;
import peddle.dto.EventDtoRq;

import java.util.List;

public interface EventService {

  List<EventDtoRs> getAll();

  List<EventDtoRs> getAllByPage(int page, int size);

  List<EventDtoRs> getByFilter(EventDtoRq eventDtoRq);

}
