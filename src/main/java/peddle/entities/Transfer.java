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
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "transfer")
public class Transfer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "t_id")
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "t_type")
  private TransportType transportType;

  @Column(name = "t_number")
  private int number;

  @Column(name = "t_price")
  private int price;

  @Column(name = "t_owner")
  private Long owner;

  @Column(name = "t_depatr_time")
  private Date departTime;


  @Column(name = "t_duration")
  private int duration;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "t_from")
  private City fromCity;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "t_to")
  private City toCity;

  public Transfer(TransportType transportType, int number, int price, Long owner,
                  Date departTime, int duration, City fromCity, City toCity) {
    this.transportType = transportType;
    this.number = number;
    this.price = price;
    this.owner = owner;
    this.departTime = departTime;
    this.duration = duration;
    this.fromCity = fromCity;
    this.toCity = toCity;
  }
}
