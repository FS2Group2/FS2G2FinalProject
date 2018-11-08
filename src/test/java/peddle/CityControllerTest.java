package peddle;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import peddle.controllers.CityController;
import peddle.dto.CityDto;
import peddle.services.CityServiceImpl;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(CityController.class)
@AutoConfigureMockMvc(secure = false)
public class CityControllerTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private CityServiceImpl service;

  private final static String CITY_NAME = "Test_city";

  @Test
  public void givenCities_whenGetCities_thenReturnJsonArray() throws Exception {
    CityDto cityDto = new CityDto();
    cityDto.setId(0L);
    cityDto.setName(CITY_NAME);
    List<CityDto> allCities = Arrays.asList(cityDto);

    given(service.getAll()).willReturn(allCities);

    mvc.perform(get("/api/city/all")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(1)))
        .andExpect(jsonPath("$[0].name").value(CITY_NAME));
  }

}
