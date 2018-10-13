package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Role;
import peddle.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByNameIgnoreCase(String name);

  Optional<User> findByEmail(String email);

  Optional<User> findFirstByRole(Role role);

  User findByProfileId(Long id);

}
