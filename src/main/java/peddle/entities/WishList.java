package peddle.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GenerationType;

@Data
@NoArgsConstructor
@Entity
@Table(name = "wish_list")
public class WishList {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "w_id")
  private Long id;

  @Column(name = "w_user")
  private Long user;

  public Long getEvent() {
    return event;
  }

  @Column(name = "w_event")
  private Long event;

  public WishList(Long user, Long event) {
    this.user = user;
    this.event = event;
  }

}
