package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.ErrorConstants;
import peddle.configuration.UserException;
import peddle.dto.EventDtoRs;
import peddle.dto.WishListDto;
import peddle.entities.User;
import peddle.entities.WishList;
import peddle.repository.WishListRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishListServiceImpl implements WishListService {

  @Autowired
  private ModelMapper modelMapper;

  private final WishListRepository wishListRepository;

  public WishListServiceImpl(WishListRepository wishListRepository) {
    this.wishListRepository = wishListRepository;
  }


  public List<EventDtoRs> getAllByUserId(Long userId) {
    WishList wishList = wishListRepository.findById(userId)
            .orElseThrow(() -> new UserException(ErrorConstants.ERR_USER_NOT_FOUND));
    return wishList.getEvents().stream()
            .map(event -> modelMapper.map(event, EventDtoRs.class)).collect(Collectors.toList());
  }

  @Override
  public void addNewEventToUser(WishListDto wishListDto) {

  }

  @Override
  public void deleteBadEventFromUser(WishListDto wishListDto) {

  }
}
