package be.technifutur.Labo3.model.dtos;

import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.types.PayementMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    Integer orderID;

    String reference;

    Instant creationDate = Instant.now();

    Boolean isPaid;

    PayementMethod payementMethod;

    UserDto userDto;

    List<ProductDto> productsDto;
}

//method to calculate the price of list productsDto
