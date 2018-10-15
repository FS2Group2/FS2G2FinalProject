package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import peddle.dto.TransferDtoRs;
import peddle.dto.TransferDtoRq;
import peddle.services.TransferServiceImpl;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/transfer")
public class TransferController {

  @Autowired
  private TransferServiceImpl transferService;

  @PostMapping(path = "")
  public List<TransferDtoRs> getTransferByCitiesAndDates(@Valid @RequestBody TransferDtoRq transferDtoRq) {
    List<TransferDtoRs> transfersDto = transferService.getTransferByCitiesAndDates(transferDtoRq);
    return transfersDto;
  }

  @RequestMapping(path = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<TransferDtoRs> getAll() {
    List<TransferDtoRs> transferDtoRs = transferService.getAll();
    return transferDtoRs;
  }

}
