package be.technifutur.Labo3.model.repositories;

import be.technifutur.Labo3.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findDistinctByCategoriesTypeIgnoreCaseOrSupplierCompanyNameIgnoreCaseOrNameIgnoreCase(String name,String name1,String name2);

//    select distinct p.name s.company_name c.type
//    from product as p
//    join supplier as s on p.supplier_supplier_id = s.supplier_id
//    join product_categories as z on p.product_id = z.product_product_id
//    join category as c on z.categories_category_id = c.category_id
//    where p.name =  or s.company_name =  or c.type = ?1
}
