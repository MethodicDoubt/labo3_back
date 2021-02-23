package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.model.dtos.OrderDto;
import be.technifutur.Labo3.model.entities.Order;

import java.util.List;

public class OrderService implements Crudable<Order, OrderDto,Integer> {
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
