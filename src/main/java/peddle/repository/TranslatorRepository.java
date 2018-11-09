package peddle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peddle.entities.Translator;

import java.util.Optional;

public interface TranslatorRepository extends JpaRepository<Translator, Long> {
  Optional<Translator> findByLanguage(String language);
}
