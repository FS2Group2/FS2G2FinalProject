package peddle.services;

import peddle.dto.EventDto;
import peddle.dto.EventFilterDto;

import java.text.ParseException;
import java.util.List;

public interface EventService {

  List<EventDto> getAll();

  List<EventDto> getAllByPage(int page, int size);

  List<EventDto> getByCity(EventFilterDto eventFilterDto) throws ParseException;

}
