package peddle.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@Entity
@Table(name = "translator")
public class Translator {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "trl_id")
  private Long id;

  @Column(name = "trl_language")
  private String language;

  public Translator(String language) {
    this.language = language;
  }
}
