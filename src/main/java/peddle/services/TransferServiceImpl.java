package peddle.services;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.configuration.ErrorConstants;
import peddle.dto.TransferDtoRs;
import peddle.dto.TransferDtoRq;
import peddle.entities.Transfer;
import peddle.repository.TransferRepository;
import peddle.utils.DateOperationUtils;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransferServiceImpl implements TransferService {

  @Autowired
  private TransferRepository transferRepository;

  @Autowired
  private ModelMapper modelMapper;

  private static final Logger logger = LoggerFactory.getLogger(TransferServiceImpl.class);


  @Override
  public List<TransferDtoRs> getAll() {
    List<Transfer> transfers = transferRepository.findAll();

    List<TransferDtoRs> transfersDto = new ArrayList<>();
    transfers.forEach(transfer -> {
      transfersDto.add(modelMapper.map(transfer, TransferDtoRs.class));
    });

    return transfersDto;
  }

  @Override
  public List<TransferDtoRs> getTransferByCities(TransferDtoRq transferDtoRq) {
    List<Transfer> transfers = transferRepository.findByFromCity_NameAndToCity_Name(
            transferDtoRq.getCityFrom(),
            transferDtoRq.getCityTo());

    List<TransferDtoRs> transfersDto = new ArrayList<>();
    transfers.forEach(transfer -> {
      transfersDto.add(modelMapper.map(transfer, TransferDtoRs.class));
    });

    return transfersDto;
  }

  @Override
  public List<TransferDtoRs> getTransferByCitiesAndDates(TransferDtoRq transferDtoRq) {
    List<Transfer> transfers;
    try {
      Date dateFrom = transferDtoRq.getDateFromConverted();
      Date dateTo = DateOperationUtils.addDays(transferDtoRq.getDateToConverted(), 1);

      String logStr = String.format("\n from %s to %s", transferDtoRq.getCityFrom(), transferDtoRq.getCityTo());
      logger.info(logStr);
      logStr = String.format("\n Date from(%s): %td-%<tm-%<tY, to(%s): %td-%<tm-%<tY\n",
          transferDtoRq.getDateFrom(), dateFrom, transferDtoRq.getDateTo(), dateTo);
      logger.info(logStr);

      transfers = transferRepository.findByFromCity_NameAndToCity_NameAndDepartTimeBetween(
              transferDtoRq.getCityFrom(),
              transferDtoRq.getCityTo(),
              dateFrom, dateTo);
    } catch (ParseException e) {
      throw new BadRequestException(ErrorConstants.ERR_DATA_DOES_NOT_EXIST);
    }

    List<TransferDtoRs> transfersDto = new ArrayList<>();
    transfers.forEach(transfer -> {
      transfersDto.add(modelMapper.map(transfer, TransferDtoRs.class));
    });

    return transfersDto;
  }
}
