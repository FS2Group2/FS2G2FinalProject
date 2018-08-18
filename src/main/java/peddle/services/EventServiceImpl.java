package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Service;
import peddle.dto.EventDto;
import peddle.dto.EventFilterDto;
import peddle.repository.EventRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<EventDto> getAll() {
    List<EventDto> eventsDto = new ArrayList<>();
    eventRepository.findAll().forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    return eventsDto;
  }

  @Override
  public List<EventDto> getAllByPage(int page, int size) {
    List<EventDto> eventsDto = new ArrayList<>();
    eventRepository.findAll(PageRequest.of(page,size))
            .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    return eventsDto;
  }

  @Override
  public List<EventDto> getByCity(EventFilterDto eventFilterDto) throws ParseException {
    List<EventDto> eventsDto = new ArrayList<>();
    /*
    eventRepository.findByDateAfter(eventFilterDto.getDateFin())
    .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    eventRepository.findByDateBetween(eventFilterDto.getDateStart(),
      eventFilterDto.getDateFin()).forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));

    if (eventFilterDto.getCityId() > 0) {
      eventRepository.findEventByCity_Id(eventFilterDto.getCityId(),
              PageRequest.of(eventFilterDto.getPage(), eventFilterDto.getPageSize()))
              .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    } else {
      eventRepository.findAll(PageRequest.of(eventFilterDto.getPage(), eventFilterDto.getPageSize()))
              .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    }

      eventRepository.findEventByCity_Id(eventFilterDto.getCityId(),
              PageRequest.of(eventFilterDto.getPage(), eventFilterDto.getPageSize()))
              .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
  */
    eventRepository.findEventByCity_Name(eventFilterDto.getCityName(),
              PageRequest.of(eventFilterDto.getPage(), eventFilterDto.getPageSize()))
              .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));

    return eventsDto;
  }
}
