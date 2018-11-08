package peddle;

import org.junit.Assert;
import peddle.entities.City;
import peddle.repository.CityRepository;

public class CityBefore {

    private CityRepository cityRepository;

    public CityBefore(CityRepository cityRepository){
        this.cityRepository = cityRepository;
    }

    public void createNewCity(String cityName){
        Assert.assertNull(cityRepository.findByName(cityName).orElse(null));
        City city = new City(cityName);
        cityRepository.save(city);
        Assert.assertNotNull(cityRepository.findByName(cityName).orElse(null));
    }
}
