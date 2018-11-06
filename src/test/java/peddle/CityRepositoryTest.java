package peddle;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import peddle.entities.City;
import peddle.repository.CityRepository;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CityRepositoryTest {

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findByName(){
    Optional<City> city = Optional.of(new City("Lviv"));
    entityManager.persist(city);
    entityManager.flush();

    Optional<City> found = cityRepository.findByName(city.getClass().getName());

    assertThat(found.getClass().getName()).
            isEqualTo(city.getClass().getName());
  }
}
