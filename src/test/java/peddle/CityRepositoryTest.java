package peddle;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import peddle.entities.City;
import peddle.repository.CityRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest(classes = Application.class)
public class CityRepositoryTest {

    private final static String CITY_NAME = "Kiev";
    private final static String CITY_NAME2 = "Lviv";

  @Autowired
  private CityRepository cityRepository;

    @Before
    public void before(){
        new CityBefore(cityRepository).createNewCity(CITY_NAME);
    }

    @After
    public void after(){
        cityRepository.deleteByName(CITY_NAME);
        Assert.assertNull(cityRepository.findByName(CITY_NAME).orElse(null));
    }

    @Test
    public void getCityTest() {
        Assert.assertNotNull(cityRepository.findByName(CITY_NAME));
    }

    @Test
    public void saveCityTest(){
        Assert.assertNotNull(cityRepository.findByName(CITY_NAME));
    }

    @Test
    public void updateCityTest(){
        City updateCity = cityRepository.findByName(CITY_NAME).get();
        updateCity.setName("Lviv");
        cityRepository.save(updateCity);
        Assert.assertEquals(updateCity, cityRepository.findByName(CITY_NAME2).get());
        cityRepository.deleteByName(CITY_NAME2);
        Assert.assertNull(cityRepository.findByName(CITY_NAME2).orElse(null));
    }

    @Test
    public void deleteCityTest(){
        Assert.assertNotNull(cityRepository.findByName(CITY_NAME));
        cityRepository.deleteByName(CITY_NAME);
        Assert.assertNull(cityRepository.findByName(CITY_NAME).orElse(null));
    }
}