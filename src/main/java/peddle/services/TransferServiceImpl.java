package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.configuration.ErrorConstants;
import peddle.dto.TransferDtoRs;
import peddle.dto.TransferDtoRq;
import peddle.entities.Transfer;
import peddle.repository.TransferRepository;

import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransferServiceImpl implements TransferService {

  @Autowired
  private TransferRepository transferRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<TransferDtoRs> getAll() {
    List<TransferDtoRs> transfersDto = transferRepository
            .findAll().stream()
            .map(transfer -> modelMapper.map(transfer, TransferDtoRs.class))
            .collect(Collectors.toList());
    return transfersDto;
  }

  @Override
  public List<TransferDtoRs> getTransferByCities(TransferDtoRq transferDtoRq) {
    List<Transfer> transfers = transferRepository.findByFromCity_NameAndToCity_Name(
            transferDtoRq.getCityFrom(),
            transferDtoRq.getCityTo());

    List<TransferDtoRs> transfersDto = transfers.stream()
            .map(transfer -> modelMapper.map(transfer, TransferDtoRs.class))
            .collect(Collectors.toList());

    return transfersDto;
  }

  @Override
  public List<TransferDtoRs> getTransferByCitiesAndDates(TransferDtoRq transferDtoRq) {
    List<Transfer> transfers;
    try {
      transfers = transferRepository.findByFromCity_NameAndToCity_NameAndDepartTimeBetween(
              transferDtoRq.getCityFrom(),
              transferDtoRq.getCityTo(),
              transferDtoRq.getDateFromConverted(),
              transferDtoRq.getDateToConverted());
    } catch (ParseException e) {
      throw new BadRequestException(ErrorConstants.ERR_DATA_DOES_NOT_EXIST);
    }

    List<TransferDtoRs> transfersDto = transfers.stream()
            .map(transfer -> modelMapper.map(transfer, TransferDtoRs.class))
            .collect(Collectors.toList());
    return transfersDto;
  }
}
