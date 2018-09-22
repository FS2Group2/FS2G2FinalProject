package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;

import peddle.configuration.ErrorConstants;
import peddle.dto.EventDtoRs;
import peddle.dto.EventDtoRq;
import peddle.dto.EventFullDtoRs;

import peddle.entities.Category;
import peddle.entities.Event;
import peddle.repository.CategoryRepository;
import peddle.repository.EventRepository;

import java.util.ArrayList;
import java.util.List;

import java.text.ParseException;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

  private static final String SORT_ORDER = "date";

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<EventDtoRs> getAll() {
    List<EventDtoRs> eventsDto = new ArrayList<>();
    eventRepository.findAll(Sort.by(SORT_ORDER)).forEach(event -> eventsDto.add(modelMapper.map(event, EventDtoRs.class)));
    return eventsDto;
  }

  @Override
  public List<EventDtoRs> getAllByPage(int page, int size) {
    List<EventDtoRs> eventsDto = new ArrayList<>();
    eventRepository.findAll(PageRequest.of(page, size, Sort.by(SORT_ORDER)))
            .forEach(event -> eventsDto.add(modelMapper.map(event, EventDtoRs.class)));
    return eventsDto;
  }

  @Override
  public List<EventDtoRs> getByFilter(EventDtoRq eventDtoRq) {
    List<Event> events;
    PageRequest pageRequest = PageRequest.of(
            eventDtoRq.getPage(),
            eventDtoRq.getPageSize(),
            Sort.by(SORT_ORDER));

    try {
      if (eventDtoRq.getCityName().isEmpty() && eventDtoRq.getCategoryId() == 0) {
        events = eventRepository.findEventByDateBetween(
                eventDtoRq.getDateStartConverted(),
                eventDtoRq.getDateFinConverted(),
                pageRequest);
      } else if (eventDtoRq.getCityName().isEmpty() && eventDtoRq.getCategoryId() != 0) {
        events = eventRepository.findEventByCategoryIdAndDateBetween(
                eventDtoRq.getCategoryId(),
                eventDtoRq.getDateStartConverted(),
                eventDtoRq.getDateFinConverted(),
                pageRequest);
      } else if (eventDtoRq.getCategoryId() == 0) {
        events = eventRepository.findEventByCity_NameAndDateBetween(
                eventDtoRq.getCityName(),
                eventDtoRq.getDateStartConverted(),
                eventDtoRq.getDateFinConverted(),
                pageRequest);
      } else {
        events = eventRepository.findEventByCategory_IdAndCity_NameAndDateBetween(
                eventDtoRq.getCategoryId(),
                eventDtoRq.getCityName(),
                eventDtoRq.getDateStartConverted(),
                eventDtoRq.getDateFinConverted(),
                pageRequest);
      }

    } catch (ParseException e) {
      throw new BadRequestException(ErrorConstants.ERR_DATA_DOES_NOT_EXIST);
    }

    List<EventDtoRs> eventsDtoRs = events.stream()
            .map(event -> modelMapper.map(event, EventDtoRs.class))
            .collect(Collectors.toList());

    return eventsDtoRs;
  }

  public EventFullDtoRs getById(Long id) {
    return modelMapper.map(eventRepository.findById(id).get(), EventFullDtoRs.class);
  }

  @Override
  public List<EventDtoRs> getEventsByCategoryId(Long categoryId) {
    List<EventDtoRs> eventDtoRs = new ArrayList<>();
    Category category = categoryRepository.findById(categoryId).orElseThrow(() ->
            new BadRequestException(ErrorConstants.ERR_CATEGORY_NOT_FOUND));
    eventRepository.findEventByCategory(category).forEach(event -> eventDtoRs.add(modelMapper.map(event, EventDtoRs.class)));
    return eventDtoRs;
  }

  @Override
  public int getNumberOfEventsByCategoryId(Long categoryId) {
    int size = getEventsByCategoryId(categoryId).size();
    return size;
  }

}
