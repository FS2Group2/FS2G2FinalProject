package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.City;

public interface CityRepository extends CrudRepository<City, Long> {
}
