package peddle.services;

import peddle.dto.PurchaseDtoRs;

import java.util.List;

public interface PurchaseService {

  List<PurchaseDtoRs> getAllPurchase(Long id);

}
