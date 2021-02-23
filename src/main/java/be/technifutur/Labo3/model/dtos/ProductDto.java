package be.technifutur.Labo3.model.dtos;

import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.entities.Supplier;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {

    Integer productId;
    String name;
    String description;
    List<Category> categories;
    Instant entryDate;
    Instant updateDate;
    LocalDate expirationDate;
    Double purchasePrice;
    Integer quantity;
    Supplier supplier;
    String productImage;
    Double vat;

}
