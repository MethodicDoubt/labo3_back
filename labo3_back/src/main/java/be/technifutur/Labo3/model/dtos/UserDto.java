package be.technifutur.Labo3.model.dtos;

import be.technifutur.Labo3.model.entities.Address;
import be.technifutur.Labo3.model.entities.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    Integer userId;
    String lastName;
    String firstName;
    be.technifutur.Labo3.model.types.AccessLevel accessLevel;
    String surname;
    String password;
    Address address;
    List<OrderDto> ordersDto;
    Byte[] avatar;
    //Security
    boolean isAccountNonExpired;
    boolean isAccountNonLocked;
    boolean isCredentialsNonExpired;
    boolean isEnabled;
}
