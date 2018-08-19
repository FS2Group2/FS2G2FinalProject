package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import peddle.entities.Accommodation;

import java.util.List;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
  List<Accommodation> findAccommodationsByCity_Name(String cityName);
}
