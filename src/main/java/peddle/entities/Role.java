package peddle.entities;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="role")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="r_id", unique = true)
  private Long id;

  @Column(name="r_name")
  private String name;

  public Role(String name) {
    this.name = name;
  }
}
