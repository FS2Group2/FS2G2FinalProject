package peddle.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;



import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "event")
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "e_id")
  private Long id;

  @Column(name = "e_api_id")
  private String apiId;

  @Column(name = "e_name")
  private String name;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "e_location")
  private City city;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "e_category")
  private Category category;

  @Column(name = "e_date")
  private Date date;

  @Column(name = "e_owner")
  private Long owner;

  @Column(name = "e_duration")
  private int duration;

  @OneToOne(
          fetch = FetchType.LAZY,
          cascade = CascadeType.ALL,
          orphanRemoval = true)
  @JoinColumn(name = "e_extra")
  private EventExtra eventExtra;

  @Column(name = "e_price")
  private int price;

  @ManyToMany(fetch = FetchType.LAZY, mappedBy = "events")
  private List<User> users;

  public Event(){}

  public Event(String name, City city, Category category, Date date, Long owner,
               int duration, EventExtra eventExtra, int price) {
    this.name = name;
    this.city = city;
    this.category = category;
    this.date = date;
    this.owner = owner;
    this.duration = duration;
    this.eventExtra = eventExtra;
    this.price = price;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public City getCity() {
    return city;
  }

  public Date getDate() {
    return date;
  }

  public Long getOwner() {
    return owner;
  }

  public int getDuration() {
    return duration;
  }

  public EventExtra getEventExtra() {
    return eventExtra;
  }

  public int getPrice() {
    return price;
  }

  public List<User> getUsers() {
    return users;
  }

  public void setUsers(List<User> users) {
    this.users = users;
  }
}
