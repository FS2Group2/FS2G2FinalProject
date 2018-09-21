package peddle.utils;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.crypto.password.PasswordEncoder;
import peddle.entities.Accommodation;
import peddle.entities.City;
import peddle.entities.Event;
import peddle.entities.EventExtra;
import peddle.entities.Profile;
import peddle.entities.Purchase;
import peddle.entities.Role;
import peddle.entities.Transfer;
import peddle.entities.TransportType;
import peddle.entities.User;
import peddle.entities.Category;

import peddle.repository.AccommodationRepository;
import peddle.repository.CityRepository;
import peddle.repository.RoleRepository;
import peddle.repository.EventRepository;
import peddle.repository.TransportTypeRepository;
import peddle.repository.TransferRepository;
import peddle.repository.UserRepository;
import peddle.repository.PurchaseRepository;
import peddle.repository.CategoryRepository;

import javax.transaction.Transactional;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.GregorianCalendar;
import java.util.Arrays;


@Configuration
public class FillTables {

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private AccommodationRepository accommodationRepository;

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private TransportTypeRepository transportTypeRepository;

  @Autowired
  private TransferRepository transferRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PurchaseRepository purchaseRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  private  static final int DAYS_SCHEDULE = 30;

  private class Hotel {
    private String name;
    private int price;
    private int minOrderTime;

    public Hotel(String name, int price, int minOrderTime) {
      this.name = name;
      this.price = price;
      this.minOrderTime = minOrderTime;
    }
  }

  private class EventDescription {
    private String name;
    private String photo;
    private String description;
    private String category;
    private int duration;
    private int price;

    public EventDescription(String name, String category, String photo, String description, int duration, int price) {
      this.name = name;
      this.category = category;
      this.photo = photo;
      this.description = description;
      this.duration = duration;
      this.price = price;
    }
  }

  private List<EventDescription> readerEvents() {
    List<EventDescription> evetns = new ArrayList<>();
    JSONParser parser = new JSONParser();

    try {
      Object obj = parser.parse(new FileReader("./src/main/resources/events.json"));

      JSONArray eventsList = (JSONArray) obj;

      eventsList.forEach( event -> {
        JSONObject eventObject = (JSONObject) event;
        String name = (String) eventObject.get("Name");
        String category = (String) eventObject.get("Category");
        String description = (String) eventObject.get("Description");
        String photo = (String) eventObject.get("Photo");
        int duration = ((Long) eventObject.get("Duration")).intValue();
        int price = ((Long) eventObject.get("Price")).intValue();

        evetns.add(new EventDescription(name, category, photo, description, duration, price));
        /*
        System.out.println("Name: " + name);
        System.out.println("Category: " + category);
        System.out.println("Description: " + description);
        System.out.println("Photo: " + photo);
        System.out.println("Duration: " + duration);
        System.out.println("Price: " + price);
        */
      });
    } catch (Exception e) {
      e.printStackTrace();
    }
    return evetns;
  }

  private Date getCurrentDate() {
    Calendar cal = new GregorianCalendar();
    cal.clear(Calendar.HOUR_OF_DAY);
    cal.clear(Calendar.MINUTE);
    cal.clear(Calendar.SECOND);
    cal.clear(Calendar.MILLISECOND);
    return cal.getTime();
  }

  private Date addDays(Date date, int days) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    cal.add(Calendar.DATE, days);
    return cal.getTime();
  }

  private Date addHours(Date date, int hours) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    cal.add(Calendar.HOUR, hours);
    return cal.getTime();
  }

  @Bean
  public CommandLineRunner addRoles() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        Arrays.asList("ADMIN", "CUSTOMER", "EVENTS_SELLER",
                "TRANSFERS_SELLER", "ACCOMMODATIONS_SELLER")
                .forEach(role -> roleRepository.save(new Role(role)));
        System.out.println("Added data to Role table");
      }
    };
  }

  @Bean
  public CommandLineRunner addCities() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        Arrays.asList("Kyiv", "Lviv", "Dnipro", "Kharkiv", "Odessa",
                "Ivano-Frankivsk", "Chernivci", "Mikolayv", "Kriviy Rig", "Kherson",
                "Giromyr", "Chernigiv", "Uman")
                .forEach(city -> cityRepository.save(new City(city)));
        System.out.println("Added data to City table");
      }
    };
  }

  @Bean
  public CommandLineRunner addTransportType() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        Arrays.asList("Fly", "Train", "Bus")
                .forEach(transport -> transportTypeRepository.save(new TransportType(transport)));
        System.out.println("Added data to TransportType table");
      }
    };
  }

  @Bean
  public CommandLineRunner addCategoryType() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        List<Category> categories = new ArrayList<>();

        categories.add(new Category("Sports", "sports.jpg"));
        categories.add(new Category("Festivals", "festivals.jpg"));
        categories.add(new Category("Concerts", "concerts.jpg"));
        categories.add(new Category("Theatre", "theatre.jpg"));
        categories.add(new Category("Arts", "arts.jpg"));
        categories.add(new Category("Ethno tour", "ethnos.jpg"));
        categories.add(new Category("Gastro tour", "gastro.jpg"));
        categories.add(new Category("Education", "education.jpg"));
        categories.add(new Category("Exhibitions", "exhibitions.jpg"));

        categories.forEach(category -> categoryRepository.save(category));

        System.out.println("Added  data to Category table");
      }
    };
  }

  @Bean
  public CommandLineRunner addAccommodation() {
    return new CommandLineRunner() {
      @Override
      @Transactional
      public void run(String... args) throws Exception {
        List<City> cities = new ArrayList<>();
        cityRepository.findAll().forEach(city -> cities.add(city));

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

        for (City city : cities) {
          int quantityOfHotels = (int) (Math.random() * hotels.size() + 1);
          int hotelNumber = (int) (Math.random() * hotels.size());
          for (int j = 0; j < quantityOfHotels; j++) {
            accommodationRepository.save(new Accommodation(
                    hotels.get(hotelNumber).name, 0L,
                    hotels.get(hotelNumber).price, city,
                    hotels.get(hotelNumber).minOrderTime));
            hotelNumber = (hotelNumber + 1) % hotels.size();
          }
        }
        System.out.println("Added data Accommodation table");
      }
    };
  }

  @Bean
  public CommandLineRunner addEvent() {
    return new CommandLineRunner() {
      @Transactional
      @Override
      public void run(String... args) throws Exception {
        List<City> cities = new ArrayList<>();
        cityRepository.findAll().forEach(city -> cities.add(city));

        List<EventDescription> events = readerEvents();

        Date currentDate = new Date();

        for (City city :  cities) {
          int quantityOfEvents = (int) (Math.random() * 10 + 1);
          for (int i = 0; i < quantityOfEvents; i++) {
            int eventNumber = (int) (Math.random() * events.size());
            EventDescription event = events.get(eventNumber);

            int shiftDate = (int) (Math.random() * DAYS_SCHEDULE);
            Date eventsDate = addDays(currentDate, shiftDate);
            Category category;

            if (categoryRepository.findByName(event.category).isPresent()) {
              category = categoryRepository.findByName(event.category).get();
            } else {
              Category newCategory = new Category(event.category,"nophoto.jpg");
              category = categoryRepository.save(newCategory);
            }

            eventRepository.save(new Event(event.name, city, category, eventsDate, 0L, event.duration,
                    new EventExtra(event.photo, event.description),
                    event.price));
          }
        }
        System.out.println("Added data to Event table");
      }
    };
  }

  @Bean
  public CommandLineRunner addTransfer() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        List<TransportType> transportTypes = new ArrayList<>();
        transportTypeRepository.findAll().forEach(transport -> transportTypes.add(transport));
        List<City> cities = new ArrayList<>();
        cityRepository.findAll().forEach(city -> cities.add(city));
        int numberOfTranspotr = 2;
        for (int i = 0; i < cities.size(); i++) {
          for (int j = i + 1; j < cities.size(); j++) {
            for (int k = 0; k < transportTypes.size(); k++) {
              Date currentDate = getCurrentDate();
              currentDate = addDays(currentDate, -2);
              for (int l = 0; l < DAYS_SCHEDULE; l++) {
                int hours = (int) (Math.random() * 23);
                int duration = (int) (Math.random() * 12);

                transferRepository.save(new Transfer(transportTypes.get(k),
                        ++numberOfTranspotr, 210 / (k + 1), 0L,
                        addHours(currentDate, hours), duration,
                        cities.get(i), cities.get(j)));

                hours = (int) (Math.random() * 23);
                transferRepository.save(new Transfer(transportTypes.get(k),
                        ++numberOfTranspotr, 168 / (k + 1), 0L,
                        addHours(currentDate, hours + duration), duration,
                        cities.get(j), cities.get(i)));

                currentDate = addDays(currentDate, 1);
              }
            }
          }
        }
        System.out.println("Added data to Transfer table");
      }
    };
  }

  @Bean
  public CommandLineRunner addUser() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        List<Role> roles = new ArrayList<>();
        roleRepository.findAll().forEach(role -> roles.add(role));
        List<City> citys = new ArrayList<>();
        cityRepository.findAll().forEach(city -> citys.add(city));

        userRepository.save(new User("Alex",
                "First name Alex",
                "Last name Alex",
                "alex@gmail.com", passwordEncoder.encode("pwdAlex"),
                citys.get(0), roles.get(1),
                new Profile("New Vasiyki", "userphoto01.jpg", "Alex info"),
                new ArrayList<>(), new ArrayList<>()));

        userRepository.save(new User("Jon",
                "First name Jon",
                "Last name Jon",
                "jon@gmail.com", passwordEncoder.encode("pwdJon"),
                citys.get(2), roles.get(1),
                new Profile("New Vasiyki 2", "userphoto02.jpg", "Jon info"),
                new ArrayList<>(), new ArrayList<>()));

        System.out.println("Added users to User table");
      }
    };
  }

  @Bean
  public CommandLineRunner addPurchase() {
    return new CommandLineRunner() {
      @Override
      @Transactional
      public void run(String... args) throws Exception {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(user -> users.add(user));
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(event -> events.add(event));
        List<Transfer> transfers = new ArrayList<>();
        transferRepository.findAll().forEach(transfer -> transfers.add(transfer));
        List<Accommodation> accommodations = new ArrayList<>();
        accommodationRepository.findAll().forEach(accommodation -> accommodations.add(accommodation));

        User user1 = users.get(0);
        List<Purchase> purchases = user1.getPurchases();

        purchases.add(new Purchase(events.get(0),
                transfers.get(0), transfers.get(1),
                accommodations.get(1)));

        purchases.add(new Purchase(events.get(1),
                transfers.get(2), transfers.get(1),
                accommodations.get(2)));

        user1.setPurchases(purchases);
        userRepository.save(user1);

        user1 = users.get(1);
        purchases = user1.getPurchases();

        purchases.add(new Purchase(events.get(0),
                transfers.get(0), transfers.get(1),
                accommodations.get(2)));

        user1.setPurchases(purchases);
        userRepository.save(user1);

        System.out.println("Added same purchases to Purchace table");
      }
    };
  }

  @Bean
  public CommandLineRunner addWishList() {
    return new CommandLineRunner() {
      @Override
      @Transactional
      public void run(String... args) throws Exception {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(user -> users.add(user));
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(event -> events.add(event));

        User user1 = users.get(0);
        List<Event> events1 = user1.getEvents();
        events1.add(events.get(0));
        events1.add(events.get(1));
        userRepository.save(user1);

        user1 = users.get(1);
        events1 = user1.getEvents();
        events1.add(events.get(0));
        userRepository.save(user1);

        System.out.println("Added same wishes Wish List table");
      }
    };
  }

}
