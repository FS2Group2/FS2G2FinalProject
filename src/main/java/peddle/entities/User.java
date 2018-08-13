package peddle.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

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

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "u_id")
  private Long id;

  @Column(name = "u_name")
  private String name;

  @Column(name = "u_email")
  private String email;

  @Column(name = "u_password")
  private String password;

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

  public User(String name, String email, String password,
              City city, Role role, Profile profile,
              List<Purchase> purchases, List<Event> events) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.role = role;
    this.profile = profile;
    this.purchases = purchases;
    this.events = events;
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

  public void setEvents(List<Event> events) {
    this.events = events;
  }
}
