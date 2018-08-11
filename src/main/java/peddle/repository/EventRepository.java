package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.Event;

public interface EventRepository extends CrudRepository<Event,Long> {
}
