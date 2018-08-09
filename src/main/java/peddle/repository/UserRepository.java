package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
}
