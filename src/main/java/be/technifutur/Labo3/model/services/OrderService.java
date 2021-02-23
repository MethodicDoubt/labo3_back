package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.OrderDto;
import be.technifutur.Labo3.model.entities.Order;
import be.technifutur.Labo3.model.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return null;
    }

    @Override
    public OrderDto getById(Integer integer) {
        return null;
    }

    @Override
    public boolean insert(Order order) {
        return false;
    }

    @Override
    public boolean update(Order order, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }
}
