package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.WishList;

public interface WishListRepository extends JpaRepository<WishList, Long> {
}
