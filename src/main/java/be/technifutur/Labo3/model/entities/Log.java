package be.technifutur.Labo3.model.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@EqualsAndHashCode
@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer logId;

    @Column
    Double price;

    @Column
    Instant creationDate;

    @ManyToOne()
    Product product;

    @ManyToOne
    User user;

}
