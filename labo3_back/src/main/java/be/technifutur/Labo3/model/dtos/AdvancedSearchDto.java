package be.technifutur.Labo3.model.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdvancedSearchDto {

    String name;
    List<CategoryDto> categoriesDto;
    Double minimumPrice;
    Double maximumPrice;
    Boolean quantity;
    SupplierDto supplierDto;

}
