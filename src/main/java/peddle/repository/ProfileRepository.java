package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.Profile;

public interface ProfileRepository extends CrudRepository<Profile,Long> {
}
