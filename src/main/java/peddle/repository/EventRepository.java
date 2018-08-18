package peddle.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import peddle.entities.City;
import peddle.entities.Event;

import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {

  List<Event> findEventByCity(City city);

  List<Event> findEventByCity_Id(Long id, Pageable pageable);

  List<Event> findByDateAfter(Date dateStart);

  List<Event> findByDateBetween(Date dateStart, Date dateFin);

  /*
  List<Event> findByCityAndDateBetween();
  List<Event> findEventByCity_NameAndDateBetween()
  */

  List<Event> findEventByCity_Name(String name, Pageable pageable);
}
