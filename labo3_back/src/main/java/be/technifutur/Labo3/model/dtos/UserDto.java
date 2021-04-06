package be.technifutur.Labo3.model.dtos;

import be.technifutur.Labo3.model.entities.Address;
import be.technifutur.Labo3.model.types.AccessLevel;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    Integer userId;

    String lastName;

    String firstName;

    AccessLevel accessLevel;

    String surname;

    String password;

    Address address;

    Boolean isActive;

    List<OrderDto> ordersDto;
}
