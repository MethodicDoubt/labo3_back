package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
