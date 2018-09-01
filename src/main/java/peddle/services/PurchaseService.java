package peddle.services;

import peddle.dto.PurchaseAddDto;
import peddle.dto.PurchaseDtoRs;

import java.util.List;

public interface PurchaseService {

  List<PurchaseDtoRs> getAllPurchase(Long id);
  void addPurchaseToUser(PurchaseAddDto purchaseAddDto);

}
