package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Service;
import peddle.dto.EventDto;
import peddle.dto.EventFilterDto;
import peddle.repository.EventRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

  private static final String SORT_ORDER = "date";

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<EventDto> getAll() {
    List<EventDto> eventsDto = new ArrayList<>();
    eventRepository.findAll(Sort.by(SORT_ORDER)).forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    return eventsDto;
  }

  @Override
  public List<EventDto> getAllByPage(int page, int size) {
    List<EventDto> eventsDto = new ArrayList<>();
    eventRepository.findAll(PageRequest.of(page, size, Sort.by(SORT_ORDER)))
            .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
    return eventsDto;
  }

  @Override
  public List<EventDto> getByFilter(EventFilterDto eventFilterDto) throws ParseException, java.text.ParseException {
    List<EventDto> eventsDto = new ArrayList<>();
    PageRequest pageRequest = PageRequest.of(
            eventFilterDto.getPage(),
            eventFilterDto.getPageSize(),
            Sort.by(SORT_ORDER));

    if (eventFilterDto.getCityName().isEmpty()) {
      if (eventFilterDto.getDateStart().isEmpty()) {
        if (eventFilterDto.getDateFin().isEmpty()) {
          eventRepository.findAll(pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        } else {
          eventRepository.findEventByDateBefore(
                  eventFilterDto.getDateFinConverted(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        }
      } else {
        if (eventFilterDto.getDateFin().isEmpty()) {
          eventRepository.findEventByDateAfter(
                  eventFilterDto.getDateStartConverted(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        } else {
          eventRepository.findEventByDateBetween(
                  eventFilterDto.getDateStartConverted(),
                  eventFilterDto.getDateFinConverted(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        }
      }
    } else {
      if (eventFilterDto.getDateStart().isEmpty()) {
        if (eventFilterDto.getDateFin().isEmpty()) {
          eventRepository.findEventByCity_Name(
                  eventFilterDto.getCityName(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        } else {
          eventRepository.findEventByCity_NameAndDateBefore(
                  eventFilterDto.getCityName(),
                  eventFilterDto.getDateFinConverted(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        }
      } else {
        if (eventFilterDto.getDateFin().isEmpty()) {
          eventRepository.findEventByCity_NameAndDateAfter(
                  eventFilterDto.getCityName(),
                  eventFilterDto.getDateStartConverted(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        } else {
          eventRepository.findEventByCity_NameAndDateBetween(
                  eventFilterDto.getCityName(),
                  eventFilterDto.getDateStartConverted(),
                  eventFilterDto.getDateFinConverted(),
                  pageRequest)
                  .forEach(event -> eventsDto.add(modelMapper.map(event, EventDto.class)));
        }
      }
    }
    return eventsDto;
  }
}
