package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.TransportType;

public interface TransportTypeRepository extends CrudRepository<TransportType, Long> {
}
