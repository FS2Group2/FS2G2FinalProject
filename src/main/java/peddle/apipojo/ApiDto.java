package peddle.apipojo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ApiDto {
  private String name;
  private String apiId;
  private List<String> photos;
  private String description;
  private List<String> category;
  private List<String> cities;
  private String date;
  private float price;
}
