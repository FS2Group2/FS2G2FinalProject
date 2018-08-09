package peddle.entities;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="city")
public class City {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="c_id", unique = true)
  private Long id;

  @Column(name="c_name")
  private String name;

  public City(String name) {
    this.name = name;
  }
}
