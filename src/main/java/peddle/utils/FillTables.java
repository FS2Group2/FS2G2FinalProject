package peddle.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import peddle.entities.City;
import peddle.entities.Profile;
import peddle.entities.Role;
import peddle.entities.TransportType;
import peddle.entities.User;
import peddle.entities.Category;

import peddle.repository.CityRepository;
import peddle.repository.RoleRepository;
import peddle.repository.TransportTypeRepository;
import peddle.repository.UserRepository;
import peddle.repository.CategoryRepository;
import peddle.services.UpdateEventsService;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Optional;

import static peddle.configuration.Constants.ROLE_ADMIN;
import static peddle.configuration.Constants.ROLE_CUSTOMER;
import static peddle.configuration.Constants.ROLE_EVENTS_SELLER;

//@Configuration
public class FillTables {

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private TransportTypeRepository transportTypeRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UpdateEventsService updateEventsService;

  private static final Logger logger = LoggerFactory.getLogger(FillTables.class);

  @Bean
  public CommandLineRunner addRoles() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        Arrays.asList(ROLE_ADMIN, ROLE_CUSTOMER, ROLE_EVENTS_SELLER)
                .forEach(role -> roleRepository.save(new Role(role)));
        logger.info("Added data to Role table");
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
        logger.info("Added data to TransportType table");
      }
    };
  }

  @Bean
  public CommandLineRunner addUser() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        Role role;
        Optional roleOptional = roleRepository.findByName(ROLE_CUSTOMER);
        if (roleOptional.isPresent()) {
          role = (Role) roleOptional.get();
        } else {
          role = new Role(ROLE_CUSTOMER);
          roleRepository.save(role);
        }

        String cityName = "Boston";
        City city;
        Optional cityOptional = cityRepository.findByName(cityName);
        if (cityOptional.isPresent()) {
          city = (City) cityOptional.get();
        } else {
          city = new City(cityName);
          cityRepository.save(city);
        }

        userRepository.save(new User("Alex",
            "Alex",
            "Last name Alex",
            "ch.yuriy@ukr.net",
            passwordEncoder.encode("pwdAlex"), true,
            city, role,
            new Profile("Kiev", "userphoto01.jpg", "Alex info", null),
            new ArrayList<>(), new ArrayList<>()));

        userRepository.save(new User("Jon",
            "Jon",
            "Last name Jon",
            "jon@gmail.com",
            passwordEncoder.encode("pwdJon"), true,
            city, role,
            new Profile("Boston", "userphoto02.jpg", "Jon info", null),
            new ArrayList<>(), new ArrayList<>()));

        roleOptional = roleRepository.findByName(ROLE_EVENTS_SELLER);
        if (roleOptional.isPresent()) {
          role = (Role) roleOptional.get();
        } else {
          role = new Role(ROLE_EVENTS_SELLER);
          roleRepository.save(role);
        }

        userRepository.save(new User("Owner",
            "Owner",
            "Event Owner",
            "peddle@ukr.net",
            passwordEncoder.encode("pwdOwner"), true,
            city, role,
            new Profile("Boston", "userphoto03.jpg", "Event Owner", null),
            new ArrayList<>(), new ArrayList<>()));

        logger.info("Added users to User table");
      }
    };
  }

  @Bean
  public CommandLineRunner addCategoryType() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        List<Category> categories = new ArrayList<>();

        categories.add(new Category("Sports", "sports.jpg", "sports.svg"));
        categories.add(new Category("Music", "concerts.jpg", "concerts.svg"));
        categories.add(new Category("Arts & Theatre", "theatre.jpg", "theatre.svg"));
        categories.add(new Category("Miscellaneous", "festivals.jpg", "festivals.svg"));
        categories.add(new Category("Arts", "arts.jpg", "arts.svg"));
        categories.add(new Category("Ethno tour", "ethnos.jpg", "ethnos.svg"));
        categories.add(new Category("Gastro tour", "gastro.jpg", "gastro.svg"));
        categories.add(new Category("Education", "education.jpg", "education.svg"));
        categories.add(new Category("Exhibitions", "exhibitions.jpg", "exhibitions.svg"));
        categories.forEach(category -> categoryRepository.save(category));

        logger.info("Added  data to Category table");
      }
    };
  }

  @Bean
  public CommandLineRunner addEvents() {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        updateEventsService.addEventsFromApi();
        logger.info("Update DataBase Events first time");
      }
    };
  }
}
