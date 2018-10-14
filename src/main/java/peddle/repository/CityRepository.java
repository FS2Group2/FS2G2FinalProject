package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.City;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
  Optional<City> findByName(String cityName);
}
