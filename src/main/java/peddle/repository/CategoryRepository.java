package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Category;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findByName(String categoryName);

}
