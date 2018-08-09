package peddle.entities;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="transport_type")
public class TransportType {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="tt_id", unique = true)
  private Long id;

  @Column(name="tt_name")
  private String name;

  public TransportType(String name) {
    this.name = name;
  }
}
