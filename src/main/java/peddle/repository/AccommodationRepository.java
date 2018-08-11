package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.Accommodation;

public interface AccommodationRepository extends CrudRepository<Accommodation, Long> {
}
