package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import peddle.entities.Profile;

public interface ProfileRepository extends JpaRepository<Profile,Long> {
}
