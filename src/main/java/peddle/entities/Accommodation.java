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
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "accommodation")
public class Accommodation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "a_id")
  private Long id;

  @Column(name = "a_name")
  private String name;

  @Column(name = "a_owner")
  private Long owner;

  @Column(name = "a_price")
  private int price;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "a_location")
  private City city;

  @Column(name = "a_min_order_time")
  private int minOrderTime;

  public Accommodation(String name, Long owner, int price, City city, int minOrderTime) {
    this.name = name;
    this.owner = owner;
    this.price = price;
    this.city = city;
    this.minOrderTime = minOrderTime;
  }
}
