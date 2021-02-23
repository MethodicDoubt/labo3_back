package be.technifutur.Labo3.model.dtos;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {

    Integer categoryId;
    String type;

}
