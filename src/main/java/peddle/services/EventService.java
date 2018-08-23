package peddle.services;

import peddle.dto.EventDtoRs;
import peddle.dto.EventDtoRq;
import peddle.dto.UserEventDto;

import java.util.List;

public interface EventService {

  List<EventDtoRs> getAll();

  List<EventDtoRs> getAllByPage(int page, int size);

  List<EventDtoRs> getByFilter(EventDtoRq eventDtoRq);

  List<EventDtoRs> getAllByUserId(Long userId);

  void addNewEventToUser(UserEventDto userEventDto);
}
