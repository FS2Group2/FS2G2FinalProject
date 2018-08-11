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

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "wish_list")
public class WishList {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "w_id")
  private Long id;

  @Column(name = "w_user")
  private Long user;

  @Column(name = "w_event")
  private Long event;

  public WishList(Long user, Long event) {
    this.user = user;
    this.event = event;
  }
}
