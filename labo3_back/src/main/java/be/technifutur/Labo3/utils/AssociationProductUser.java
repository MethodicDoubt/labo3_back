package be.technifutur.Labo3.utils;

import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssociationProductUser {
    User user;
    Product product;
}
