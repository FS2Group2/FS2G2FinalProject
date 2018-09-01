package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.configuration.ErrorConstants;
import peddle.configuration.UserException;
import peddle.dto.PurchaseAddDto;
import peddle.dto.PurchaseDtoRs;
import peddle.entities.Accommodation;
import peddle.entities.Purchase;
import peddle.entities.Transfer;
import peddle.entities.User;
import peddle.entities.Event;
import peddle.repository.AccommodationRepository;
import peddle.repository.EventRepository;
import peddle.repository.TransferRepository;
import peddle.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseServiceImpl implements PurchaseService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private TransferRepository transferRepository;

  @Autowired
  private AccommodationRepository accommodationRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<PurchaseDtoRs> getAllPurchase(Long id) {
    User user = userRepository.findById(id).orElseThrow(() -> new BadRequestException("No such user"));
    List<Purchase> purchases = user.getPurchases();
    List<PurchaseDtoRs> purchasesDtoRs = new ArrayList<>();
    purchases.forEach(purchase -> {
      PurchaseDtoRs purchaseDto = modelMapper.map(purchase, PurchaseDtoRs.class);
      purchaseDto.setSumm(purchaseDto.getEventPrice()
              + purchaseDto.getTransferToPrice()
              + purchaseDto.getTransferfromPrice()
              + purchaseDto.getAccommodationPrice());
      purchasesDtoRs.add(purchaseDto);
    });
    return purchasesDtoRs;
  }

  @Override
  public List<PurchaseDtoRs> addPurchaseToUser(PurchaseAddDto purchaseAddDto) {
    User user = userRepository.findById(purchaseAddDto.getId())
            .orElseThrow(() -> new UserException(ErrorConstants.ERR_USER_NOT_FOUND));
    //List<Purchase> purchases = user.getPurchases();
    Transfer transferTo = transferRepository.findById(purchaseAddDto.getTransfertoId())
            .orElseThrow(() -> new BadRequestException("not found"));
    Transfer transferFrom = transferRepository.findById(purchaseAddDto.getTransferfromId())
            .orElseThrow(() -> new BadRequestException("not found"));
    Accommodation accommodation = accommodationRepository.findById(purchaseAddDto.getAccommodationId())
            .orElseThrow(() -> new BadRequestException("error!!"));

    Event event = eventRepository.findEventById(purchaseAddDto.getEventId());

    Purchase purchase = new Purchase(event, transferTo, transferFrom, accommodation);

    List<Purchase> result = user.getPurchases();
    result.add(purchase);
    user.setPurchases(result);

    User userResult = userRepository.save(user);

    return getAllPurchase(userResult.getId());
  }
}
