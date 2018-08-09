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
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "transfer")
public class Transfer {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "t_id", unique = true)
  private Long id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "t_type")
  private TransportType transportType;

  @Column(name = "t_number")
  private int number;

  @Column(name = "t_price")
  private int price;

  /*
  @OneToOne
  @JoinColumn(name="t_owner")
  private User owner;
  */

  @Column(name = "t_owner")
  private Long owner;

  @Column(name = "t_duration")
  private int duration;

  /*
  @Column(name="t_start_time")
  private Long startTime;
  */

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "t_from")
  private City from;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "t_to")
  private City to;

  public Transfer(TransportType transportType, int number, int price, Long owner, int duration, City from, City to) {
    this.transportType = transportType;
    this.number = number;
    this.price = price;
    this.owner = owner;
    this.duration = duration;
    this.from = from;
    this.to = to;
  }
}
