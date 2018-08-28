package peddle.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

import peddle.repository.AccommodationRepository;
import peddle.repository.CityRepository;
import peddle.repository.PurchaseRepository;
import peddle.repository.EventRepository;
import peddle.repository.RoleRepository;
import peddle.repository.TransferRepository;
import peddle.repository.TransportTypeRepository;
import peddle.repository.UserRepository;

import javax.transaction.Transactional;
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
    private int duration;
    private int price;

    public EventDescription(String name, String photo, String description, int duration, int price) {
      this.name = name;
      this.photo = photo;
      this.description = description;
      this.duration = duration;
      this.price = price;
    }
  }

  private List<EventDescription> generateEvents() {
    List<EventDescription> evetns = new ArrayList<>();
    evetns.add(new EventDescription("AFTER-HEDONISM",
            "photo01.jpg",
            "The final event of the Hedonism Festival - the After-Hedonism party.",
            8,250));

    evetns.add(new EventDescription("KORCHFEST",
            "photo02.jpg",
            "Will host a festival-exhibition of automotive subcultures Korchfest.",
            12,120));

    evetns.add(new EventDescription("METHODS OF UPBRINGING SMALL BURIALS",
            "photo03.jpg",
            "History, after which you will rethink the importance of family relationships.",
            5,400));

    evetns.add(new EventDescription("NGRID ARTHUR BAND",
            "photo04.jpg",
            "At the scene of the capital complex \"Mystetsky Arsenal\" - the world famous gospel diva Ingrid Arthur.",
            4,2500));

    evetns.add(new EventDescription("POWER OF UKRAINE",
            "photo05.jpg",
            "The most powerful and bright representatives of the \"heavy\" scene of the country - only this evening! ",
            24,250));
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
                .forEach(role ->  roleRepository.save(new Role(role)));
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
                .forEach(city ->  cityRepository.save(new City(city)));
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
                .forEach(transport ->  transportTypeRepository.save(new TransportType(transport)));
        System.out.println("Added data to TransportType table");
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
        cityRepository.findAll().forEach(city -> cities.add(city) );

        List<Hotel> hotels = new ArrayList<>();
        hotels.add(new Hotel("Hilton", 630, 24));
        hotels.add(new Hotel("Slavutich", 180, 24));
        hotels.add(new Hotel("Turist", 120, 24));
        hotels.add(new Hotel("Ukraina", 210, 24));

        int maxHotels = hotels.size();
        for (int i = 0; i < cities.size(); i++) {
          int n = i % maxHotels;
          for (int j = 0; j < n; j++) {
            accommodationRepository.save(new Accommodation(
                    hotels.get(j).name, 0L,
                    hotels.get(j).price, cities.get(i),
                    hotels.get(j).minOrderTime));
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
        cityRepository.findAll().forEach(city -> cities.add(city) );
        List<EventDescription> events = generateEvents();

        int maxEvents = events.size();
        Date currentDate = new Date();

        for (int i = 0; i < cities.size(); i++) {
          int n = (i % maxEvents) + 1;
          for (int j = 0; j < n; j++) {
            eventRepository.save(new Event(events.get(j).name, cities.get(i), currentDate,
                    0L, events.get(j).duration,
                    new EventExtra(events.get(j).photo, events.get(j).description),
                    events.get(j).price));
            currentDate = addDays(currentDate, j);
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
        final int DaysSchedule = 30;
        List<TransportType> transportTypes = new ArrayList<>();
        transportTypeRepository.findAll().forEach(transport -> transportTypes.add(transport));
        List<City> cities = new ArrayList<>();
        cityRepository.findAll().forEach(city -> cities.add(city) );
        int numberOfTranspotr = 2;
        for (int i = 0; i < cities.size(); i++) {
          for (int j = i + 1; j < cities.size(); j++) {
            for (int k = 0; k < transportTypes.size(); k++) {
              Date currentDate = getCurrentDate();
              currentDate = addDays(currentDate, -2);
              for (int l = 0; l < DaysSchedule ; l++) {
                int hours = (int) (Math.random() * 23);
                int duration = (int) (Math.random() * 12);

                transferRepository.save(new Transfer(transportTypes.get(k),
                        ++numberOfTranspotr, 235, 0L,
                        addHours(currentDate, hours), duration,
                        cities.get(i), cities.get(j)));

                hours = (int) (Math.random() * 23);
                transferRepository.save(new Transfer(transportTypes.get(k),
                        ++numberOfTranspotr, 283, 0L,
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

        userRepository.save(new User("Alex", "alex@gmail.com","passAlex",
                citys.get(0), roles.get(1),
                new Profile("Alex photo","Alex info"),
                new ArrayList<>(), new ArrayList<>()));

        userRepository.save(new User("Jon", "jon@gmail.com","passJon",
                citys.get(2), roles.get(1),
                new Profile("Jon photo","Jon info"),
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
        accommodationRepository.findAll().forEach(accommodation -> accommodations.add(accommodation) );

        User user1 = users.get(0);
        List<Purchase> purchases = user1.getPurchases();

        purchases.add(new Purchase(events.get(0),
                transfers.get(0), transfers.get(1),
                accommodations.get(1)));

        purchases.add(new Purchase( events.get(1),
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
