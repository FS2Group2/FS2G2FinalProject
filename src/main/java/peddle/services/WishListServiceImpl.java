package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.ErrorConstants;
import peddle.configuration.UserException;
import peddle.dto.EventDtoRs;
import peddle.dto.UserEventDto;
import peddle.dto.WishListDto;
import peddle.entities.Event;
import peddle.entities.User;
import peddle.entities.WishList;
import peddle.repository.EventRepository;
import peddle.repository.UserRepository;
import peddle.repository.WishListRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishListServiceImpl implements WishListService {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private ModelMapper modelMapper;

  private final UserRepository userRepository;

  public WishListServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public List<EventDtoRs> getAllByUserId(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserException(ErrorConstants.ERR_USER_NOT_FOUND));
    return user.getEvents().stream()
            .map(event -> modelMapper.map(event, EventDtoRs.class)).collect(Collectors.toList());
  }

  @Override
  public List<EventDtoRs> addNewEventToUser(WishListDto wishListDto) {
    User user = userRepository.findById(wishListDto.getUserId())
            .orElseThrow(() -> new UserException(ErrorConstants.ERR_USER_NOT_FOUND));

    Event event = eventRepository.findById(wishListDto.getEventId())
            .orElseThrow(() -> new UserException(ErrorConstants.ERR_EVENT_NOT_FOUND));

    user.getEvents().add(event);
    userRepository.save(user);

    event.getUsers().add(user);
    eventRepository.save(event);

    return  getAllByUserId(wishListDto.getUserId());
  }

  @Override
  public List<EventDtoRs> deleteBadEventFromUser(WishListDto wishListDto) {
    User user = userRepository.findById(wishListDto.getUserId())
            .orElseThrow(()-> new UserException(ErrorConstants.ERR_USER_NOT_FOUND));

    Event event = eventRepository.findById(wishListDto.getEventId())
            .orElseThrow(()-> new UserException(ErrorConstants.ERR_EVENT_NOT_FOUND));

    user.getEvents().remove(event);
    userRepository.save(user);

    return getAllByUserId(wishListDto.getUserId());
  }
}
