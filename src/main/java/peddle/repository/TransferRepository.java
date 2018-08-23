package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
}
