package peddle.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.FetchType;

import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "u_id")
  private Long id;

  @Column(name = "u_name")
  private String name;

  @Column(name = "u_first_name")
  private String firstName;

  @Column(name = "u_last_name")
  private String lastName;

  @Column(name = "u_email")
  private String email;

  @Column(name = "u_password")
  private String password;

  @Column(nullable = false, name = "u_is_active")
  private boolean isActive;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "u_default_location")
  private City city;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "u_role_id")
  private Role role;

  @OneToOne(
          fetch = FetchType.LAZY,
          cascade = CascadeType.ALL,
          orphanRemoval = true)
  @JoinColumn(name = "u_profile")
  private Profile profile;

  @OneToMany(
          fetch = FetchType.LAZY,
          cascade = CascadeType.ALL,
          orphanRemoval = true)
  @JoinColumn(name = "u_id")
  private List<Purchase> purchases;

  @ManyToMany(
          fetch = FetchType.LAZY,
          cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(name = "wishlist",
          joinColumns = {@JoinColumn(name = "w_user", nullable = false)},
          inverseJoinColumns = {@JoinColumn(name = "w_event", nullable = false)})
  private List<Event> events;

  public User(String name, String firstName, String lastName,
              String email, String password, boolean isActive,
              City city, Role role, Profile profile,
              List<Purchase> purchases, List<Event> events) {
    this.name = name;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.city = city;
    this.role = role;
    this.profile = profile;
    this.purchases = purchases;
    this.events = events;
  }

  public List<String> getRoles() {
    return Arrays.asList("ROLE_USER");
  }

  public void setPurchases(List<Purchase> purchases) {
    this.purchases = purchases;
  }

  public List<Purchase> getPurchases() {
    return purchases;
  }

  public List<Event> getEvents() {
    return events;
  }

  public boolean isActive() {
    return isActive;
  }

  public void setActive(boolean isActive) {
    this.isActive = isActive;
  }

  public void setEvents(List<Event> events) {
    this.events = events;
  }
}
