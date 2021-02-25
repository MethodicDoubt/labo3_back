package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Order;
import be.technifutur.Labo3.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findByProducts(Product product);

}
