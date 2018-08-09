package peddle.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="event")
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="e_id", unique = true)
  private Long id;

  @Column(name="e_name")
  private String name;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="e_location")
  private City city;

  @Column(name="e_date")
  private Date date;

//  @OneToOne
//  @JoinColumn(name="e_owner")
//  private User owner;
  @Column(name="e_owner")
  private Long owner;

  @Column(name="e_duration")
  private int duration;

  @OneToOne(cascade = CascadeType.ALL)
  @PrimaryKeyJoinColumn
  private EventExtra eventExtra;

  @Column(name="e_price")
  private int price;

  public Event(String name, City city, Date date, Long owner, int duration, EventExtra eventExtra, int price) {
    this.name = name;
    this.city = city;
    this.date = date;
    this.owner = owner;
    this.duration = duration;
    this.eventExtra = eventExtra;
    this.price = price;
  }
}
