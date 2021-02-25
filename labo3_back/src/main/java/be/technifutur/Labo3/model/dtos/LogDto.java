package be.technifutur.Labo3.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogDto {

    Integer logId;

    Double price;

    Instant creationDate;

    ProductDto productDto;

    UserDto userDto;
}
