package peddle.entities;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="accommodation")
public class Accommodation {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="a_id", unique = true)
  private Long id;

  @Column(name="a_name")
  private String name;

//  @OneToOne(cascade = CascadeType.ALL)
//  @JoinColumn(name="a_owner")
//  private User owner;
  @Column(name="a_owner")
  private Long owner;

  @Column(name="a_price")
  private int price;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="a_location")
  private City location;

  @Column(name="a_min_order_time")
  private int minOrderTime;

  public Accommodation(String name, Long owner, int price, City location, int minOrderTime) {
    this.name = name;
    this.owner = owner;
    this.price = price;
    this.location = location;
    this.minOrderTime = minOrderTime;
  }
}
