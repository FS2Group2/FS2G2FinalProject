package peddle.services;

import peddle.dto.TransferDtoRs;
import peddle.dto.TransferDtoRq;

import java.text.ParseException;
import java.util.List;

public interface TransferService {

  List<TransferDtoRs> getAll();

  List<TransferDtoRs> getTransferByCities(TransferDtoRq transferDtoRq);

  List<TransferDtoRs> getTransferByCitiesAndDates(TransferDtoRq transferDtoRq);

}
