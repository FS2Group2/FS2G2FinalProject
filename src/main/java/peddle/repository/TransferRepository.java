package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.Transfer;

public interface TransferRepository extends CrudRepository<Transfer, Long> {
}
