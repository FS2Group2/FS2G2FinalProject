package peddle.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Category;
import peddle.entities.Event;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

  List<Event> findEventByDateBetween(Date dateStart, Date dateFin, Pageable pageable);

  List<Event> findEventByCity_NameAndDateBetween(String name, Date dateStart, Date dateFin, Pageable pageable);

  List<Event> findEventByCategory(Category category);

  List<Event> findEventByCategoryIdAndDateBetween(Long id, Date dateStart, Date dateFin, Pageable pageable);

  List<Event> findEventByCategory_IdAndCity_NameAndDateBetween(Long id, String name, Date dateStart, Date dateFin,
                                                               Pageable pageable);

  Long countByCategory(Category category);

  Long countByCategoryAndDateIsAfter(Category category, Date dateStart);

  Optional<Event> findFirstByApiId(String apiId);

}
