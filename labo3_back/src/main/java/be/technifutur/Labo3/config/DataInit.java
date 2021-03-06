package be.technifutur.Labo3.config;

import be.technifutur.Labo3.model.entities.*;
import be.technifutur.Labo3.model.services.*;
import be.technifutur.Labo3.model.types.AccessLevel;
import be.technifutur.Labo3.model.types.JuridicalStatus;
import be.technifutur.Labo3.model.types.PayementMethod;
import be.technifutur.Labo3.model.types.Sector;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class DataInit implements InitializingBean {

    private final CategoryService categoryService;
    private final LogService logService;
    private final OrderService orderService;
    private final ProductService productService;
    private final UserService userService;
    private final SupplierService supplierService;

    private final PDFManager pdfManager;

    public DataInit(
            CategoryService categoryService, LogService logService, OrderService orderService,
            ProductService productService, UserService userService, SupplierService supplierService,
            PDFManager pdfManager) {
        this.categoryService = categoryService;
        this.logService = logService;
        this.orderService = orderService;
        this.productService = productService;
        this.userService = userService;
        this.supplierService = supplierService;
        this.pdfManager = pdfManager;
    }

    private List<Category> categories = Arrays.asList(
            Category.builder().type("Clothes").build(),
            Category.builder().type("Fruits").build(),
            Category.builder().type("SUV").build(),
            Category.builder().type("Cupboards").build(),
            Category.builder().type("Ovens").build(),
            Category.builder().type("Product Daily").build()
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
                    .build(),
            Supplier.builder()
                    .companyName("Danone")
                    .juridicalStatus(JuridicalStatus.SARL)
                    .sector(Sector.GROCERY)
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
                    .productImage("https://www.jules.com/dw/image/v2/AAHK_PRD/on/demandware.static/-/Sites-core-master-catalog/default/dw1cd07056/images/722617_1240_V2.jpg?sw=1562&sh=1800&sm=fit")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Jeans")
                    .description("Really nice jeans")
                    .categories(Arrays.asList(categories.get(0)))
                    .purchasePrice(28.54)
                    .quantity(22)
                    .supplier(suppliers.get(0))
                    .productImage("https://www.jules.com/dw/image/v2/AAHK_PRD/on/demandware.static/-/Sites-core-master-catalog/default/dw64de2f25/images/722903_9980_V2.jpg?sw=1562&sh=1800&sm=fit")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Kleppstad")
                    .description("3 doors, white, 117x176")
                    .categories(Arrays.asList(categories.get(3)))
                    .purchasePrice(89.99)
                    .quantity(12)
                    .supplier(suppliers.get(1))
                    .productImage("https://www.ikea.com/be/nl/images/products/kleppstad-kledingkast-met-3-deuren-wit__0753595_pe748783_s5.jpg?f=g")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Brimnes")
                    .description("3 doors, white, 117x190")
                    .categories(Arrays.asList(categories.get(3)))
                    .purchasePrice(149.)
                    .quantity(5)
                    .supplier(suppliers.get(1))
                    .productImage("https://www.ikea.com/be/fr/images/products/brimnes-armoire-3-portes-blanc__0858640_pe655296_s5.jpg?f=s")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Actimel 0% MG strawberry")
                    .description("0% MG,strawberry taste ")
                    .categories(Arrays.asList(categories.get(5)))
                    .purchasePrice(8.15)
                    .quantity(27)
                    .supplier(suppliers.get(2))
                    .expirationDate(LocalDateTime.of(2021, 12, 12, 00, 00).atZone(ZoneId.of("Europe/Paris")).toInstant())
                    .productImage("https://assets-us-01.kc-usercontent.com/f5a2b33b-f1c1-0070-ebd4-26269b6538af/b95b5554-169c-4f2d-8764-72affd5252c8/actimel_8_Strawberry%200%25.png?fm=webp&w=320&h=268")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("OIKOS 0% mangue")
                    .description("Oikos mangue fruit de la passion 0% est un yaourt à la grecque")
                    .categories(Arrays.asList(categories.get(5)))
                    .purchasePrice(7.15)
                    .quantity(36)
                    .supplier(suppliers.get(2))
                    .expirationDate(LocalDateTime.of(2021, 12, 12, 00, 00).atZone(ZoneId.of("Europe/Paris")).toInstant())
                    .productImage("https://assets-us-01.kc-usercontent.com/f5a2b33b-f1c1-0070-ebd4-26269b6538af/ad653be8-86a7-403f-8fd1-782aea548e25/Oikos%200%25_manguepassion_2x145g.png?fm=webp&w=320&h=268")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("Vitalinea creme dessert chocolat")
                    .description("Crème dessert au chocolat avec sucres et édulcorants, faible en matières grasses")
                    .categories(Arrays.asList(categories.get(5)))
                    .purchasePrice(18.3)
                    .quantity(52)
                    .supplier(suppliers.get(2))
                    .expirationDate(LocalDateTime.of(2021, 12, 12, 00, 00).atZone(ZoneId.of("Europe/Paris")).toInstant())
                    .productImage("https://assets-us-01.kc-usercontent.com/f5a2b33b-f1c1-0070-ebd4-26269b6538af/6d06e063-e0af-40be-8d5d-2dbc15ce01ac/7191.jpg?fm=webp&w=320&h=268")
                    .vat(.21)
                    .build(),
            Product.builder()
                    .name("DANONE COTTAGE CHEESE 420G")
                    .description("Avec son goût doux et frais, Danone Cottage Cheese Nature est idéal sur vos tartines")
                    .categories(Arrays.asList(categories.get(5)))
                    .purchasePrice(7.69)
                    .quantity(15)
                    .supplier(suppliers.get(2))
                    .expirationDate(LocalDateTime.of(2021, 12, 12, 00, 00).atZone(ZoneId.of("Europe/Paris")).toInstant())
                    .productImage("https://assets-us-01.kc-usercontent.com/f5a2b33b-f1c1-0070-ebd4-26269b6538af/8f310711-9c15-4161-aaa8-905ef937243a/Danone%20Cottage%20Cheese%20420g%20Facing%20B%20MUD.png?fm=webp&w=320&h=268")
                    .vat(.21)
                    .build()
    );
    List<User> users = Arrays.asList(
            User.builder()
                    .lastName("Arabia")
                    .firstName("Jonathan")
                    .surname("admin")
                    .password("1234")
                    .accessLevel(AccessLevel.ADMINISTRATOR)
                    .address(
                            Address.builder()
                                    .city("Tilleur")
                                    .zip("4420")
                                    .country("Belgique")
                                    .street("Rue Vinave")
                                    .number(19)
                                    .build()
                    )
                    .build(),
            User.builder()
                    .lastName("Del Piero")
                    .firstName("Alessandro")
                    .surname("user")
                    .password("1234")
                    .address(
                            Address.builder()
                                    .city("Torino")
                                    .country("Italia")
                                    .zip("10151")
                                    .street("Corso Gateano Scirea")
                                    .number(50)
                                    .build()
                    )
                    .build()
    );

    List<Order> orders = Arrays.asList(
            Order.builder()
                    .reference("test0001")
                    .isPaid(true)
                    .payementMethod(PayementMethod.CASH)
                    .products(Collections.singletonList(products.get(1)))
                    .user(users.get(1))
                    .build()
    );


    @Override
    public void afterPropertiesSet() throws Exception {

        this.pdfManager.createDocument();

        categories.forEach(this.categoryService::insert);
        suppliers.forEach(this.supplierService::insert);

        users.forEach(this.userService::insert);

        products.forEach(p -> {
            try {
                this.productService.insert(p, users.get(0));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        orders.forEach(this.orderService::insert);

    }
}
