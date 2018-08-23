package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Transfer;

import java.util.Date;
import java.util.List;

public interface TransferRepository extends JpaRepository<Transfer, Long> {

  List<Transfer> findByFromCity_NameAndToCity_Name(String fromCity, String toCity);

  List<Transfer> findByFromCity_NameAndToCity_NameAndDepartTimeBetween(
          String fromCity, String toCity, Date dateFrom, Date dateTo);

}
