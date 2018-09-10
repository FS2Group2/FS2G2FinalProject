package peddle.services;

import peddle.dto.EventDtoRs;
import peddle.dto.EventDtoRq;
import peddle.dto.UserEventDto;
import peddle.dto.EventFullDtoRs;

import java.util.List;

public interface EventService {

  List<EventDtoRs> getAll();

  List<EventDtoRs> getAllByPage(int page, int size);

  List<EventDtoRs> getByFilter(EventDtoRq eventDtoRq);

  EventFullDtoRs getById(Long id);

  List<EventDtoRs> getEventsByCategoryId(Long categoryId);

  int getNumberOfEventsByCategoryId(Long categoryId);

}
