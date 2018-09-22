package peddle.repository;

import org.springframework.data.repository.CrudRepository;
import peddle.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {

  Role findByName(String name);

}
