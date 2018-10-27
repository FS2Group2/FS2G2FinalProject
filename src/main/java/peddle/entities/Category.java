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
@Table(name = "category")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cat_id")
  private Long id;

  @Column(name = "cat_name")
  private String name;

  @Column(name = "cat_image")
  private String photo;

  @Column(name = "cat_icon")
  private String icon;

  public Category(String name, String photo, String icon) {
    this.name = name;
    this.photo = photo;
    this.icon = icon;
  }

}
