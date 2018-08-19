package peddle.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Event;

import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {

  List<Event> findEventByDateAfter(Date dateStart, Pageable pageable);

  List<Event> findEventByDateBefore(Date dateFin, Pageable pageable);

  List<Event> findEventByDateBetween(Date dateStart, Date dateFin, Pageable pageable);

  List<Event> findEventByCity_Name(String name, Pageable pageable);

  List<Event> findEventByCity_NameAndDateAfter(String name, Date dateStart, Pageable pageable);

  List<Event> findEventByCity_NameAndDateBefore(String name, Date dateFin, Pageable pageable);

  List<Event> findEventByCity_NameAndDateBetween(String name, Date dateStart, Date dateFin, Pageable pageable);

}
