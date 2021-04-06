package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("SELECT c.type FROM Category as c")
    List<String> findAllType();

    List<Category> findAllByOrderByCategoryId();

    Category findByType(String s);

}
