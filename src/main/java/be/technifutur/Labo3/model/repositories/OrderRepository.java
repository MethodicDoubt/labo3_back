package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Integer> {
}
