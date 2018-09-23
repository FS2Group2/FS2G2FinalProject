package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.UserToken;

import java.util.Optional;

public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

  Optional<UserToken> findByToken(String token);

}
