package peddle.services;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import peddle.apipojo.ApiDto;
import peddle.apipojo.ClassificationsApi;
import peddle.apipojo.EventApi;
import peddle.apipojo.FullEventsApi;
import peddle.apipojo.ImageApi;
import peddle.apipojo.PriceEventApi;
import peddle.apipojo.VenueEventApi;
import peddle.entities.Accommodation;
import peddle.entities.Category;
import peddle.entities.City;
import peddle.entities.Event;
import peddle.entities.EventExtra;
import peddle.entities.Role;
import peddle.entities.Transfer;
import peddle.entities.TransportType;
import peddle.entities.User;
import peddle.repository.AccommodationRepository;
import peddle.repository.CategoryRepository;
import peddle.repository.CityRepository;
import peddle.repository.EventRepository;
import peddle.repository.RoleRepository;
import peddle.repository.TransferRepository;
import peddle.repository.TransportTypeRepository;
import peddle.repository.UserRepository;
import peddle.utils.DateOperationUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static peddle.configuration.Constants.ROLE_EVENTS_SELLER;

//@EnableScheduling
//@Service
public class UpdateEventsService {

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private TransportTypeRepository transportTypeRepository;

  @Autowired
  private TransferRepository transferRepository;

  @Autowired
  private AccommodationRepository accommodationRepository;

  @Autowired
  private RestTemplate restTemplate;

  private static final Logger logger = LoggerFactory.getLogger(UpdateEventsService.class);


  @Scheduled(cron = "0 */45 * * * *")
  public void updateSchedule() throws Exception {
    addEventsFromApi();
    logger.info("Update DataBase Events");
  }

  @Transactional
  public void addEventsFromApi() throws Exception {
    final int maxEventsCount = 10;
    final int pageSize = 20;
    int eventsCount = 0;
    int currentPage = 0;
    boolean hasNext = true;
    while (eventsCount < maxEventsCount && hasNext) {
      String url = String.format("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=%s&size=%d&page=%d&apikey=9IU9ZLwAWRy2C14nazyZQQLX9mcjQhwZ", "US", pageSize, currentPage);
      FullEventsApi fullEventsApi = restTemplate.getForObject(url, FullEventsApi.class);
      List<ApiDto> apiEventsDto = eventApiPojoToDto(fullEventsApi);
      apiDtoToEntity(apiEventsDto);

      logger.info(fullEventsApi.toString());

      eventsCount += fullEventsApi.getPageApi().getSize();
      hasNext = ++currentPage < fullEventsApi.getPageApi().getTotalPages();
    }
  }

  private List<ApiDto> eventApiPojoToDto(FullEventsApi fullEventsApi) {
    List<EventApi> eventsApi = fullEventsApi.getEventsApi().getEventApiList();

    ModelMapper modelMapper = new ModelMapper();

    Converter<EventApi, ApiDto> customConverter = new Converter<EventApi, ApiDto>() {
      @Override
      public ApiDto convert(MappingContext<EventApi, ApiDto> mappingContext) {
        EventApi source = mappingContext.getSource();
        ApiDto destination = mappingContext.getDestination();

        destination.setName(source.getName());
        destination.setApiId(source.getId());

        List<ImageApi> images = source.getImageApiList();
        if (images != null) {
          destination.setPhotos(images
              .stream()
              .map(ImageApi::getUrl)
              .collect(Collectors.toList())
          );
        }

        List<ClassificationsApi> classifications = source.getClassifications();
        if (classifications != null) {
          destination.setCategory(classifications
              .stream()
              .map(classification -> classification.getSegment().getName())
              .collect(Collectors.toList())
          );
        }

        List<VenueEventApi> venues = source.getVenuesEvent().getVenues();
        if (venues != null) {
          destination.setCities(venues
              .stream()
              .map(venue -> venue.getCity().getName())
              .collect(Collectors.toList())
          );
        }

        destination.setDate(source.getDatesEvent().getStartEvent().getDateTime());

        List<PriceEventApi> prices = source.getPriceEvent();
        if (prices != null) {
          PriceEventApi minPrice = prices
              .stream()
              .min(Comparator.comparing(PriceEventApi::getMin))
              .orElse(new PriceEventApi());
          destination.setPrice(minPrice.getMin());
        } else {
          destination.setPrice(0);
        }

        destination.setDescription("No description");

        return destination;
      }
    };

    modelMapper.addConverter(customConverter);

    List<ApiDto> result = new ArrayList<>();
    eventsApi.forEach(eventApi -> {
      result.add(modelMapper.map(eventApi, ApiDto.class));
      ApiDto apiDto = modelMapper.map(eventApi, ApiDto.class);
    });
    return result;
  }

  private void apiDtoToEntity(List<ApiDto> apiDtoList) {
    Long ownerId = 0L;
    if (roleRepository.findByName(ROLE_EVENTS_SELLER).isPresent()) {
      Role role = roleRepository.findByName(ROLE_EVENTS_SELLER).get();
      Optional<User> userOwnerOptional = userRepository.findFirstByRole(role);
      if (userOwnerOptional.isPresent()) {
        ownerId = userOwnerOptional.get().getId();
      }
    }

    Long finalOwnerId = ownerId;
    apiDtoList.forEach(eventDto -> {
      if (!eventRepository.findFirstByApiId(eventDto.getApiId()).isPresent()) {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
        Date eventDate = DateOperationUtils.getCurrentDate();
        try {
          eventDate = dateFormat.parse(eventDto.getDate());
        } catch (ParseException e) {
          e.printStackTrace();
        }

        for (int i = 0; i < eventDto.getCities().size(); i++) {
          String cityName = eventDto.getCities().get(i);
          Optional<City> cityOptional = cityRepository.findByName(cityName);
          City city;
          if (cityOptional.isPresent()) {
            city = cityOptional.get();
          } else {
            City cityCreate = new City(cityName);
            city = cityRepository.save(cityCreate);
            addAccommodationToCity(city);
          }
          addTransferToCity(city, eventDate);

          for (int j = 0; j < eventDto.getCategory().size(); j++) {
            String categoryName = eventDto.getCategory().get(i);
            Optional<Category> categoryOptional = categoryRepository.findByName(categoryName);
            Category category;
            if (categoryOptional.isPresent()) {
              category = categoryOptional.get();
            } else {
              categoryOptional = categoryRepository.findByName("Miscellaneous");
              if (categoryOptional.isPresent()) {
                category = categoryOptional.get();
              } else {
                Category categoryCreate = new Category("Miscellaneous", "festivals.jpg", "festivals.svg");
                category = categoryRepository.save(categoryCreate);
              }
            }

            int duration = 6;

            Event event = new Event(eventDto.getName(), eventDto.getApiId(), city, category,
                eventDate, finalOwnerId, duration,
                new EventExtra(eventDto.getPhotos().get(0), eventDto.getDescription()),
                Math.round(eventDto.getPrice()));

            eventRepository.save(event);
          }
        }
      }
    });
  }

  private class Hotel {
    private String name;
    private int price;
    private int minOrderTime;

    private Hotel(String name, int price, int minOrderTime) {
      this.name = name;
      this.price = price;
      this.minOrderTime = minOrderTime;
    }
  }

  private void addAccommodationToCity(City city) {
    List<Hotel> hotels = new ArrayList<>();
    hotels.add(new Hotel("Hilton", 630, 24));
    hotels.add(new Hotel("Slavutich", 180, 24));
    hotels.add(new Hotel("Turist", 120, 24));
    hotels.add(new Hotel("Ukraina", 210, 24));
    hotels.add(new Hotel("Hotel Atlas", 430, 24));
    hotels.add(new Hotel("Panorama", 240, 24));
    hotels.add(new Hotel("Nobilis Hotel", 410, 24));
    hotels.add(new Hotel("Atlas Delux", 260, 24));
    hotels.add(new Hotel("Intourist", 240, 24));
    hotels.add(new Hotel("Encore", 640, 24));
    hotels.add(new Hotel("Astoria", 330, 24));
    hotels.add(new Hotel("President Hotel", 750, 24));
    hotels.add(new Hotel("Atlantic Garden Resort", 620, 24));
    hotels.add(new Hotel("Bartolomeo", 960, 24));

    int quantityOfHotels = (int) (Math.random() * hotels.size() + 1);
    int hotelNumber = (int) (Math.random() * hotels.size());
    for (int i = 0; i < quantityOfHotels; i++) {
      accommodationRepository.save(new Accommodation(
          hotels.get(hotelNumber).name, 0L,
          hotels.get(hotelNumber).price, city,
          hotels.get(hotelNumber).minOrderTime));
      hotelNumber = (hotelNumber + 1) % hotels.size();
    }
    logger.info("Added data Accommodation to city - " + city.getName());
  }


  private void addTransferToCity(City eventCity, Date eventDate) {
    final int days_shedule = 3;

    TransportType transportType = transportTypeRepository.findByName("Fly");
    cityRepository.findAll().forEach(city -> {
      if (!city.getId().equals(eventCity.getId())) {
        int numberOfTranspotr = (int) (eventCity.getId() * 100 + city.getId() * 10);
        Date currentDate = DateOperationUtils.addDays(eventDate, (-1) * days_shedule);
        //currentDate = DateOperationUtils.clearTimeInDate(currentDate);
        for (int i = 0; i < (days_shedule * 2); i++) {
          int countOfTransfers = 2;
          for (int j = 0; j < countOfTransfers ; j++) {
            int hours = (int) (Math.random() * 23);
            int duration = (int) (Math.random() * 12);

            transferRepository.save(new Transfer(transportType,
                ++numberOfTranspotr, 210, 0L,
                DateOperationUtils.addHours(currentDate, hours), duration,
                city, eventCity));

            hours = (int) (Math.random() * 23);
            transferRepository.save(new Transfer(transportType,
                ++numberOfTranspotr, 168, 0L,
                DateOperationUtils.addHours(currentDate, hours + duration), duration,
                eventCity, city));

            currentDate = DateOperationUtils.addDays(currentDate, 1);
          }
        }
      }
    });
    logger.info("Added Transfer from city - " + eventCity.getName());
  }
}
