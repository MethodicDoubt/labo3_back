package be.technifutur.Labo3.mapper;

import be.technifutur.Labo3.model.dtos.LogDto;
import be.technifutur.Labo3.model.dtos.OrderDto;
import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.Log;
import be.technifutur.Labo3.model.entities.Order;
import be.technifutur.Labo3.model.entities.User;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class Mapper {

    public UserDto toUserDto(User user) {
        return toUserDto(user, false);
    }

    public UserDto toUserDto(User user, Boolean withOrders) {
        return UserDto.builder()
                .userId(user.getUserId())
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .accessLevel(user.getAccessLevel())
                .surname(user.getSurname())
                .password(user.getPassword())
                .address(user.getAddress())
                .ordersDto(withOrders ?
                        user.getOrders()
                                .stream()
                                .map(this::toOrderDto)
                                .collect(Collectors.toList()) : null
                )
                .build();
    }

    public User toUserEntity(UserDto userDto) {
        return User.builder()
                .userId(userDto.getUserId())
                .lastName(userDto.getLastName())
                .firstName(userDto.getFirstName())
                .accessLevel(userDto.getAccessLevel())
                .surname(userDto.getSurname())
                .password(userDto.getPassword())
                .address(userDto.getAddress())
                .orders(
                        userDto.getOrdersDto()
                                .stream()
                                .map(this::toOrderEntity)
                                .collect(Collectors.toList())
                )
                .build();
    }

    public OrderDto toOrderDto(Order order) {
        return toOrderDto(order, false, false);
    }

    public OrderDto toOrderDto(Order order, Boolean withUser, Boolean withProducts) {
        return OrderDto.builder()
                .orderID(order.getOrderID())
                .reference(order.getReference())
                .creationDate(order.getCreationDate())
                .isPaid(order.getIsPaid())
                .payementMethod(order.getPayementMethod())
                .userDto(withUser ?
                        toUserDto(order.getUser()) : null
                )
                .productsDto(withProducts ?
                        order.getProducts()
                                .stream()
                                .map(this::toProductDto)
                                .collect(Collectors.toList()) : null
                )
                .build();
    }

    public Order toOrderEntity(OrderDto orderDto) {
        return Order.builder()
                .orderID(orderDto.getOrderID())
                .reference(orderDto.getReference())
                .creationDate(orderDto.getCreationDate())
                .isPaid(orderDto.getIsPaid())
                .payementMethod(orderDto.getPayementMethod())
                .user(toUserEntity(orderDto.getUserDto()))
                .products(
                        orderDto.getProductsDto()
                                .stream()
                                .map(this::toProductEntity)
                                .collect(Collectors.toList())
                )
                .build();
    }

    public LogDto toLogDto(Log log) {
        return LogDto.builder()
                .logId(log.getLogId())
                .price(log.getPrice())
                .creationDate(log.getCreationDate())
                .productDto(toProductDto(log.getProduct()))
                .userDto(toUserDto(log.getUser()))
                .build();
    }

    public Log toLogEntity(LogDto logDto) {
        return LogDto.builder()
                .logId(logDto.getLogId())
                .price(logDto.getPrice())
                .creationDate(logDto.getCreationDate())
                .productDto(toProductEntity(logDto.getProductDto()))
                .userDto(toUserEntity(logDto.getUserDto()))
                .build();
    }

}

