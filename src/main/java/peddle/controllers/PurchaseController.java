package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import peddle.dto.PurchaseAddDto;
import peddle.dto.PurchaseDtoRs;
import peddle.dto.WishListDto;
import peddle.services.PurchaseServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

  @Autowired
  private PurchaseServiceImpl purchaseService;

  @RequestMapping(path = "/all/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<PurchaseDtoRs> getAll(@PathVariable Long id) {
    List<PurchaseDtoRs> purchaseDtoRs = purchaseService.getAllPurchase(id);
    return purchaseDtoRs;
  }

  @PostMapping("/add")
  @ResponseBody
  public List<PurchaseDtoRs> addPurchase(@RequestBody PurchaseAddDto purchaseAddDto) {
    return purchaseService.addPurchaseToUser(purchaseAddDto);
  }

}
