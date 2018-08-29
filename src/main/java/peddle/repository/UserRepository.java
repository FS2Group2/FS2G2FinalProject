package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
