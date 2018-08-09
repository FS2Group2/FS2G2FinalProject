package peddle.entities;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="event_extra")
public class EventExtra {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="ei_id")
  private Long id;

  @Column(name="ei_photo")
  private String photo;

  @Column(name="ei_description")
  private String description;

  public EventExtra(String photo, String description) {
    this.photo = photo;
    this.description = description;
  }
}
