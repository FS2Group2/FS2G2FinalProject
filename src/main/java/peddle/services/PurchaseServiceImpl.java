package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.configuration.EmailService;
import peddle.configuration.ErrorConstants;
import peddle.configuration.UserException;
import peddle.dto.PurchaseAddDto;
import peddle.dto.PurchaseDtoRs;
import peddle.entities.Accommodation;
import peddle.entities.Event;
import peddle.entities.Purchase;
import peddle.entities.Transfer;
import peddle.entities.Translator;
import peddle.entities.User;
import peddle.repository.AccommodationRepository;
import peddle.repository.EventRepository;
import peddle.repository.TransferRepository;
import peddle.repository.TranslatorRepository;
import peddle.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

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
  private TranslatorRepository translatorRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private EmailService emailService;

  @Override
  public List<PurchaseDtoRs> getAllPurchase(Long id) {
    User user = userRepository.findById(id).orElseThrow(() ->
        new BadRequestException(ErrorConstants.ERR_USER_NOT_FOUND));
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
    Transfer transferTo = null;
    if (purchaseAddDto.getTransfertoId() > 0) {
      transferTo = transferRepository.findById(purchaseAddDto.getTransfertoId())
          .orElseThrow(() -> new BadRequestException(ErrorConstants.ERR_TRANSFER_NOT_FOUND));
    }

    Transfer transferFrom = null;
    if (purchaseAddDto.getTransferfromId() > 0) {
      transferFrom = transferRepository.findById(purchaseAddDto.getTransferfromId())
          .orElseThrow(() -> new BadRequestException(ErrorConstants.ERR_TRANSFER_NOT_FOUND));
    }

    Accommodation accommodation = null;
    if (purchaseAddDto.getAccommodationId() > 0) {
      accommodation = accommodationRepository.findById(purchaseAddDto.getAccommodationId())
          .orElseThrow(() -> new BadRequestException(ErrorConstants.ERR_ACCOMMODATION_NOT_FOUND));
    }

    Event event = eventRepository.findById(purchaseAddDto.getEventId())
        .orElseThrow(() -> new UserException(ErrorConstants.ERR_EVENT_NOT_FOUND));

    Translator translator = null;
    if (purchaseAddDto.getTranslatorId() > 0) {
      translator = translatorRepository.findById(purchaseAddDto.getTranslatorId())
          .orElseThrow(() -> new BadRequestException(ErrorConstants.ERR_TRANSLATOR_NOT_FOUND));
    }

    Boolean photographer = false;
    photographer = purchaseAddDto.getPhotographer();


    Purchase purchase = new Purchase(event, transferTo, transferFrom, accommodation, translator, photographer);

    User user = userRepository.findById(purchaseAddDto.getId())
        .orElseThrow(() -> new UserException(ErrorConstants.ERR_USER_NOT_FOUND));

    List<Purchase> result = user.getPurchases();
    result.add(purchase);
    user.setPurchases(result);

    User userResult = userRepository.save(user);

    String message = "Hello, " + user.getFirstName() + "!\n\n"
        + "You bought new event: " + event.getName() + "\n\n"
        + "Best regards,\nThe team of \"Event Tour\".";

    String to = user.getEmail();
    String subject = "You nought new event!";
    emailService.sendSimpleMessage(to, subject, message);

    if (event.getOwner() > 0 && userRepository.findById(event.getOwner()).isPresent()) {
      User owner = userRepository.findById(event.getOwner()).get();
      if (!owner.getEmail().isEmpty()) {
        message = "User " + user.getEmail() + " bought you events \""  + event.getName() + "\"";
        to = owner.getEmail();
        subject = "Bought  your event!";
        emailService.sendSimpleMessage(to, subject, message);
      }
    }

    return getAllPurchase(userResult.getId());
  }
}
