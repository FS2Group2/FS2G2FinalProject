package peddle.services;

import peddle.dto.EventDtoRs;
import peddle.dto.UserEventDto;
import peddle.dto.WishListDto;

import java.util.List;

public interface WishListService {

  List<EventDtoRs> getAllByUserId(Long userId);

  List<EventDtoRs> addNewEventToUser(WishListDto wishListDto);

  void deleteBadEventFromUser(WishListDto wishListDto);
}
