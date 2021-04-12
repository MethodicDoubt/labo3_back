package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.OrderDto;
import be.technifutur.Labo3.model.entities.Order;
import be.technifutur.Labo3.model.exceptionHandler.OrderNotFoundException;
import be.technifutur.Labo3.model.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class OrderService implements Crudable<Order, OrderDto, Integer> {

    private final OrderRepository orderRepository;
    private final Mapper mapper;

    public OrderService(OrderRepository orderRepository, Mapper mapper) {
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }

    @Override
    public List<OrderDto> getAll() {
        return this.orderRepository.findAllByOrderByOrderId()
                .stream()
                .map(o -> this.mapper.toOrderDto(o, true, true))
                .collect(Collectors.toList())
                ;
    }

    @Override
    public OrderDto getById(Integer integer) {
        Order order = this.orderRepository.findById(integer).orElseThrow(() -> new OrderNotFoundException("Order not found"));

        return this.mapper.toOrderDto(order, true, true);
    }

    @Override
    public boolean insert(Order order) {

        if()

        order.setCreationDate(Instant.now());
        Order newOrder = this.orderRepository.save(order);
        return this.orderRepository.existsById(newOrder.getOrderId());
    }

    @Override
    public boolean update(Order order, Integer integer) {
        Order oldOrder = this.orderRepository.getOne(integer);
        Order newOrder = new Order(
                oldOrder.getOrderId(),
                oldOrder.getReference(),
                oldOrder.getCreationDate(),
                oldOrder.getIsPaid(),
                oldOrder.getPayementMethod(),
                oldOrder.getUser(),
                oldOrder.getProducts()
        );

        order.setOrderId(integer);

        this.orderRepository.save(order);

        return !newOrder.equals(this.orderRepository.getOne(integer));
    }

    @Override
    public boolean delete(Integer integer) {
        this.orderRepository.deleteById(integer);
        return this.orderRepository.existsById(integer);
    }

    public String createReference(Order order) {

        StringBuilder stringBuilder = new StringBuilder();

        String newRef = stringBuilder.append(Instant.now().getNano())
                .append(order.getUser().getUserId())
//                .append(order.getUser().getFirstName())
                .append(order.getUser().getSurname())
                .append(order.getProducts().stream().map(p -> p.getProductId().toString()).collect(Collectors.joining()))
                .toString();
        return newRef;

    }

}
