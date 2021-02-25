package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {



}
