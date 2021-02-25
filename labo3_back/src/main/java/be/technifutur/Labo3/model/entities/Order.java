package be.technifutur.Labo3.model.entities;

import be.technifutur.Labo3.model.types.PayementMethod;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@EqualsAndHashCode
@Entity
@Table(name = "command")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer orderID;

    @Column(nullable = false)
    String reference;

    @Column(nullable = false)
    Instant creationDate;

    @Column(nullable = false)
    Boolean isPaid;

    @Enumerated(EnumType.STRING)
    PayementMethod payementMethod;

    @ManyToOne
    User user;

    @ManyToMany
    List<Product> products;

}
