package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
