package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import peddle.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
