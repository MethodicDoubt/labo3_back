package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.OrderDto;
import be.technifutur.Labo3.model.entities.Order;
import be.technifutur.Labo3.model.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
        return this.orderRepository.findAll()
                .stream()
                .map(o -> this.mapper.toOrderDto(o))
                .collect(Collectors.toList())
                ;
    }

    @Override
    public OrderDto getById(Integer integer) {
        Order order = this.orderRepository.findById(integer).orElseThrow(() -> new NoSuchElementException("Order not found"));

        return this.mapper.toOrderDto(order, true, true);
    }

    @Override
    public boolean insert(Order order) {
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
}
