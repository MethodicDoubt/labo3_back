package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    @Query("SELECT s.companyName FROM Supplier as s")
    List<String> findAllByCompanyName();

    Supplier findByCompanyName(String s);

}
