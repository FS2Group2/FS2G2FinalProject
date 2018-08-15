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
import javax.persistence.OneToOne;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "purchase")
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "p_id")
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "p_event")
  private Event event;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "p_transfer_to")
  private Transfer transferTo;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "p_transfer_from")
  private Transfer transferFrom;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "p_accommodation")
  private Accommodation accommodation;

  public Purchase(Event event, Transfer transferTo, Transfer transferFrom, Accommodation accommodation) {
    this.event = event;
    this.transferTo = transferTo;
    this.transferFrom = transferFrom;
    this.accommodation = accommodation;
  }
}
