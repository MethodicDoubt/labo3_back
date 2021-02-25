package be.technifutur.Labo3.model.dtos;

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
public class SupplierDto {

    Integer supplierId;
    String companyName;
    JuridicalStatus juridicalStatus;
    Sector sector;
    Instant insertionDate;
    Instant updateDate;

}
