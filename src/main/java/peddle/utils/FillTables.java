package peddle.utils;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import peddle.entities.*;
import peddle.repository.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Configuration
public class FillTables {
  private void addRoles(RoleRepository repository) {
    repository.save(new Role("ADMIN"));
    repository.save(new Role("CUSTOMER"));
    repository.save(new Role("EVENTS_SELLER"));
    repository.save(new Role("TRANSFERS_SELLER"));
    repository.save(new Role("ACCOMMODATIONS_SELLER"));
  }
  private void addCity(CityRepository repository) {
    repository.save(new City("Kyiv"));
    repository.save(new City("Lviv"));
    repository.save(new City("Dnipro"));
    repository.save(new City("Kharkiv"));
    repository.save(new City("Odessa"));
  }

  private void addAccommodation(AccommodationRepository repository) {
    City city = new City("Brovary-1");
    repository.save(new Accommodation("Hotell", 2L, 240, city, 1));
    city = new City("Borispyl-1");
    repository.save(new Accommodation("Apartment", 2L, 240, city, 1));
  }

  private void addEvent(EventRepository repository) throws Exception{
    repository.save(new Event("Concert",
            new City("Brovary"),
            new SimpleDateFormat("dd/MM/yyyy").parse("03/09/2018"),
            1L, 250,
            new EventExtra("photo1", "description1"),
            320));

    repository.save(new Event("Dance",
            new City("Borispyl"),
            new SimpleDateFormat("dd/MM/yyyy").parse("08/09/2018"),
            4L, 50,
            new EventExtra("photo-2", "description-2"),
            160));

//    Event event = repository.findById(1L).get();
//    System.out.printf("Event = %s City = %s", event.getName(), event.getCity().getName());
//    System.out.println();
  }

  private void addTransfer(TransferRepository repository) {
    repository.save(new Transfer(
            new TransportType("Train"), 456, 2235, 2L, 8,
            new City("Paris"),
            new City("Prague"))
    );
  }

  private void addUser(UserRepository repository) {
    repository.save(new User("Alex", "alex@gmail.com","pass",
            new City("Kiev"),
            new Role("USER"),
            new Profile("Users photo","users info")));
  }

//  private void addPurchase(PurchaseRepository repository) throws Exception {
//    Event event =              new Event("Concert p",
//            new City("Brovary p"),
//            new SimpleDateFormat("dd/MM/yyyy").parse("03/10/2018");
//
//            repository.save(1L,
//                    1L, 250,
//                    new EventExtra("photo1", "description1"),
//                    320),
//            new Transfer(
//                    new TransportType("Train"), 456, 2235, 2L, 8,
//                    new City("Paris"),
//                    new City("Prague")),
//            new Transfer(
//                    new TransportType("Train"), 457, 2235, 2L, 8,
//                    new City("Prague"),
//                    new City("Paris")),
//            new Accommodation("Apartment", 2L, 240, new City("Prague"), 1));
//  }

  @Bean
  public CommandLineRunner role(RoleRepository repository) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        addRoles(repository);
        System.out.println("Fill Role table");
      }
    };
  }

  @Bean
  public CommandLineRunner city(CityRepository repository) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        addCity(repository);
        System.out.println("Fill City table");
      }
    };
  }

  @Bean
  public CommandLineRunner event(EventRepository repository) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        addEvent(repository);
        System.out.println("Fill Event table");
      }
    };
  }

  @Bean
  public CommandLineRunner accommodation(AccommodationRepository repository) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        addAccommodation(repository);
        System.out.println("Fill Accommodation table");
      }
    };
  }

  @Bean
  public CommandLineRunner transfer(TransferRepository repository) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        addTransfer(repository);
        System.out.println("Fill Transfer table");
      }
    };
  }

  @Bean
  public CommandLineRunner user(UserRepository repository) {
    return new CommandLineRunner() {
      @Override
      public void run(String... args) throws Exception {
        addUser(repository);
        System.out.println("Fill User table");
      }
    };
  }

}
