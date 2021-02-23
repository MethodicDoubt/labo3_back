package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log,Integer> {

}
