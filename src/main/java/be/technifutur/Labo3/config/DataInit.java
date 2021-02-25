package be.technifutur.Labo3.config;

import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.Supplier;
import be.technifutur.Labo3.model.services.*;
import be.technifutur.Labo3.model.types.JuridicalStatus;
import be.technifutur.Labo3.model.types.Sector;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
public class DataInit implements InitializingBean {

    private final CategoryService categoryService;
    private final LogService logService;
    private final OrderService orderService;
    private final ProductService productService;
    private final UserService userService;
    private final SupplierService supplierService;

    public DataInit(
            CategoryService categoryService, LogService logService, OrderService orderService,
            ProductService productService, UserService userService, SupplierService supplierService
    ) {
        this.categoryService = categoryService;
        this.logService = logService;
        this.orderService = orderService;
        this.productService = productService;
        this.userService = userService;
        this.supplierService = supplierService;
    }

    private List<Category> categories = Arrays.asList(
            Category.builder().type("Clothes").build(),
            Category.builder().type("Fruits").build(),
            Category.builder().type("SUV").build(),
            Category.builder().type("Cupboards").build(),
            Category.builder().type("Ovens").build()
    );

    private List<Supplier> suppliers = Arrays.asList(
            Supplier.builder()
                    .companyName("Jules")
                    .juridicalStatus(JuridicalStatus.SARL)
                    .sector(Sector.FASHION)
                    .build(),
            Supplier.builder()
                    .companyName("Ikea")
                    .juridicalStatus(JuridicalStatus.SARL)
                    .sector(Sector.FURNITURE)
                    .build()
    );

    private List<Product> products = Arrays.asList(
            Product.builder()
                    .name("Sweater")
                    .description("Nice sweater")
                    .categories(Arrays.asList(categories.get(0)))
                    .purchasePrice(48.54)
                    .quantity(42)
                    .supplier(suppliers.get(0))
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Jeans")
                    .description("Really nice jeans")
                    .categories(Arrays.asList(categories.get(0)))
                    .purchasePrice(28.54)
                    .quantity(22)
                    .supplier(suppliers.get(0))
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Kleppstad")
                    .description("3 doors, white, 117x176")
                    .categories(Arrays.asList(categories.get(3)))
                    .purchasePrice(89.99)
                    .quantity(12)
                    .supplier(suppliers.get(1))
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Brimnes")
                    .description("3 doors, white, 117x190")
                    .categories(Arrays.asList(categories.get(3)))
                    .purchasePrice(149.)
                    .quantity(5)
                    .supplier(suppliers.get(1))
                    .vat(.21)
                    .build()
    );


    @Override
    public void afterPropertiesSet() throws Exception {
        categories.forEach(this.categoryService::insert);
        suppliers.forEach(this.supplierService::insert);
        products.forEach(this.productService::insert);
    }
}
