package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.TransportType;

public interface TransportTypeRepository extends JpaRepository<TransportType, Long> {

  TransportType findByName(String name);

}
