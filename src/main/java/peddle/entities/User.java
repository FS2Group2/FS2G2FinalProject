package peddle.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="u_id", unique = true)
  private Long id;

  @Column(name="u_name")
  private String name;

  @Column(name="u_email")
  private String email;

  @Column(name="u_password")
  private String password;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="u_default_location")
  private City city;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name="u_role_id")
  private Role role;

  @OneToOne(cascade = CascadeType.ALL)
  @PrimaryKeyJoinColumn
  private Profile profile;

//  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//  @JoinTable(name = "wishlist",
//          joinColumns = {@JoinColumn(name = "w_user", nullable = false)},
//          inverseJoinColumns = {@JoinColumn(name = "w_event", nullable = false)}
//  )
//  private List<Event> events;
//
//  @OneToMany(
//          cascade = CascadeType.ALL,
//          orphanRemoval = true,
//          fetch = FetchType.LAZY)
//  @JoinColumn(name = "p_user")
//  private List<Purchase> purchases;

  public User(String name, String email, String password, City city, Role role, Profile profile) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.role = role;
    this.profile = profile;
  }
}
