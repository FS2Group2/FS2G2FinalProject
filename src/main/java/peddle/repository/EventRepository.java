package peddle.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Category;
import peddle.entities.Event;

import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {

  List<Event> findEventByDateBetween(Date dateStart, Date dateFin, Pageable pageable);

  List<Event> findEventByCity_NameAndDateBetween(String name, Date dateStart, Date dateFin, Pageable pageable);

  Event findEventById(Long id);

  List<Event> findEventByCategory(Category category);

}
