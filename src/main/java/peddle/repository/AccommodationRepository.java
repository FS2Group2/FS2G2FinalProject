package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Accommodation;
import peddle.entities.City;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
  List<Accommodation> findByCity(City city);
}
