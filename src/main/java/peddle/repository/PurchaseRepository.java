package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.Purchase;

public interface PurchaseRepository extends CrudRepository<Purchase, Long> {
}
