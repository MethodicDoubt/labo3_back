package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, QuerydslPredicateExecutor {

    List<Product> findAllByOrderByProductId();

    List<Product> findDistinctByCategoriesTypeContainingIgnoreCaseOrSupplierCompanyNameContainingIgnoreCaseOrNameContainingIgnoreCase(String name, String name1, String name2, Pageable var4);
    List<Product> findDistinctByCategoriesTypeContainingIgnoreCaseOrSupplierCompanyNameContainingIgnoreCaseOrNameContainingIgnoreCase(String name, String name1, String name2);

}
