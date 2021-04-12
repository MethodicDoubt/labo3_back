package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User>  findAllByOrderByUserId();

    User findBySurnameEquals(String surname);
}
