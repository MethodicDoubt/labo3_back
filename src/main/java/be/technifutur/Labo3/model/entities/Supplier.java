package be.technifutur.Labo3.model.entities;

import be.technifutur.Labo3.model.types.JuridicalStatus;
import be.technifutur.Labo3.model.types.Sector;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.Instant;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer supplierId;

    @Column
    String companyName;

    @Column
    @Enumerated(EnumType.STRING)
    JuridicalStatus juridicalStatus;

    @Column
    @Enumerated(EnumType.STRING)
    Sector sector;

    @Column
    Instant insertionDate;

    @Column
    Instant updateDate;

}
