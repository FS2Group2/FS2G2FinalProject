package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.City;

public interface CityRepository extends JpaRepository<City, Long> {
  City findByName(String cityName);
}
