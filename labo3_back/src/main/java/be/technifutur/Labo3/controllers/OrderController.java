package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.OrderDto;
import be.technifutur.Labo3.model.entities.Order;
import be.technifutur.Labo3.model.services.OrderService;
import be.technifutur.Labo3.model.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("orders")
public class OrderController implements RestControllable<Order, OrderDto, Integer> {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    @GetMapping
    public ResponseEntity<List<OrderDto>> getAll() {
        return ResponseEntity.ok(this.orderService.getAll());
    }

    @Override
    public ResponseEntity<OrderDto> getOne(Integer integer) {
        return null;
    }

    @Override
    @PostMapping
    public ResponseEntity<Boolean> insert(@RequestBody Order order) {

        order.setReference(this.orderService.createReference(order));

        return ResponseEntity.ok(this.orderService.insert(order));

    }

    @Override
    public ResponseEntity<Boolean> update(Order order, Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }

}
