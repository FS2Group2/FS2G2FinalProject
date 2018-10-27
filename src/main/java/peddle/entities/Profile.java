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
@Table(name = "profile")
public class Profile {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "pr_id")
  private Long id;

  @Column(name = "pr_city_living")
  private String cityLiving;

  @Column(name = "pr_photo")
  private String photo;

  @Column(name = "pr_info")
  private String info;

  public Profile(String cityLiving, String photo, String info) {
    this.cityLiving = cityLiving;
    this.photo = photo;
    this.info = info;
  }
}
