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
@Table(name = "transport_type")
public class TransportType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "tt_id")
  private Long id;

  @Column(name = "tt_name")
  private String name;

  public TransportType(String name) {
    this.name = name;
  }
}
