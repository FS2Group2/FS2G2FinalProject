package peddle;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import peddle.entities.City;
import peddle.repository.CityRepository;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CityRepositoryTest {
  private final static String CITY_NAME = "Test_city_repository";

  @Autowired
  private TestEntityManager entityManager;

  @Autowired
  private CityRepository cityRepository;

  @Before
  public void before() {
    City city = new City(CITY_NAME);
    entityManager.persist(city);
    entityManager.flush();
  }

  @After
  public void after() {
    City city = cityRepository.findByName(CITY_NAME).get();
    entityManager.remove(city);
  }

  @Test
  public void getCityTest() {
    Optional<City> city = cityRepository.findByName(CITY_NAME);
    Assert.assertEquals(CITY_NAME, city.get().getName());
  }
}
