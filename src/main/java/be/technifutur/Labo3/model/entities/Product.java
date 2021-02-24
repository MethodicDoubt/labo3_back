package be.technifutur.Labo3.model.entities;

import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EqualsAndHashCode
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer productId;

    @Column(length = 50, nullable = false)
    String name;

    @Column
    String description;

    @Column(nullable = false)
    @ManyToMany
    List<Category> categories;

    @Column(nullable = false)
    Instant entryDate = Instant.now();

    @Column(nullable = false)
    Instant updateDate = Instant.now();

    @Column
    LocalDate expirationDate;

    @Column(nullable = false)
    @Min(value = 0, message = "The price must be a positive number")
    Double purchasePrice;

    @Column(nullable = false)
    @Min(value = 0, message = "The quantity must be a positive number")
    Integer quantity;

    @Column(nullable = false)
    @ManyToOne
    Supplier supplier;

    @Column
    String productImage;

    @Column(nullable = false)
    @Min(value = 0, message = "The vat must be a positive number")
    Double vat;

    @ManyToMany(mappedBy = "products")
    List<Order> orders;

}
