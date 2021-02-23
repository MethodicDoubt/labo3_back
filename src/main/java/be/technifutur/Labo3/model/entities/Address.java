package be.technifutur.Labo3.model.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.Embeddable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@FieldDefaults(level = AccessLevel.PRIVATE)
@Embeddable
public class Address {
    String street;
    Integer number;
    String zip;
    String city;
    String country;
}
