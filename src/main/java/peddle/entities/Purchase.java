package peddle.entities;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name="purchase")
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="p_id")
  private Long id;

  @Column(name="p_user")
  private Long user;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="p_event")
  private Event event;
//  @Column(name="p_event")
//  private Long event;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="p_transfer_to")
  private Transfer transferTo;
//  @Column(name="p_transfer_to")
//  private Long transferTo;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="p_transfer_from")
  private Transfer transferFrom;
//  @Column(name="p_transfer_from")
//  private Long transferFrom;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="p_accommodation")
  private Accommodation accommodation;
//  @Column(name="p_accommodation")
//  private Long accommodation;

  public Purchase(Long user, Event event, Transfer transferTo, Transfer transferFrom, Accommodation accommodation) {
    this.user = user;
    this.event = event;
    this.transferTo = transferTo;
    this.transferFrom = transferFrom;
    this.accommodation = accommodation;
  }
}
