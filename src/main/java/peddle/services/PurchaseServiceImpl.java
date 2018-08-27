package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.dto.PurchaseDtoRs;
import peddle.entities.Purchase;
import peddle.entities.User;
import peddle.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseServiceImpl implements PurchaseService {

  @Autowired
  private UserRepository userRepository;

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
}
