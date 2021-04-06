package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.AdvancedSearchDto;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.QProduct;
import be.technifutur.Labo3.model.exceptionHandler.ProductNotFoundException;
import be.technifutur.Labo3.model.repositories.CategoryRepository;
import be.technifutur.Labo3.model.repositories.OrderRepository;
import be.technifutur.Labo3.model.repositories.ProductRepository;
import be.technifutur.Labo3.model.repositories.SupplierRepository;
import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService implements Crudable<Product, ProductDto, Integer> {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final OrderRepository orderRepository;

    private final Mapper mapper;


    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, SupplierRepository supplierRepository, OrderRepository orderRepository, Mapper mapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }


    @Override
    public List<ProductDto> getAll() {
        return this.productRepository.findAllByOrderByProductId()
                .stream()
                .map(p -> mapper.toProductDto(p, true))
                .collect(Collectors.toList())
                ;
    }

    @Override
    public ProductDto getById(Integer integer) {

        Product product = this.productRepository.findById(integer).orElseThrow(() -> new NoSuchElementException(("Product not found")));

        product.setOrders(this.orderRepository.findByProducts(product));

        return mapper.toProductDto(product, true);
    }

    @Override
    public boolean insert(Product product) {

        product.setEntryDate(Instant.now());
        product.setUpdateDate(Instant.now());
        product.setIsActive(true);
        Product newProduct = this.productRepository.save(product);

        return this.productRepository.findById(newProduct.getProductId()).isPresent();

    }

    @Override
    public boolean update(Product product, Integer integer) {

        Product oldProduct = this.productRepository.getOne(integer);

        Product newProduct = new Product(oldProduct.getProductId(),
                oldProduct.getName(),
                oldProduct.getDescription(),
                oldProduct.getCategories(),
                oldProduct.getEntryDate(),
                oldProduct.getUpdateDate(),
                oldProduct.getExpirationDate(),
                oldProduct.getPurchasePrice(),
                oldProduct.getQuantity(),
                oldProduct.getSupplier(),
                oldProduct.getProductImage(),
                oldProduct.getIsActive(),
                oldProduct.getVat(),
                oldProduct.getOrders());

        product.setProductId(integer);
        product.setUpdateDate(Instant.now());

        this.productRepository.save(product);

        return !newProduct.equals(this.productRepository.getOne(integer));

    }

    @Override
    public boolean delete(Integer integer) throws ProductNotFoundException {
        return false;
    }

    public List<ProductDto> findByNameOrCategoryOrSupplier(String string) {
        return this.productRepository.findDistinctByCategoriesTypeContainingIgnoreCaseOrSupplierCompanyNameContainingIgnoreCaseOrNameContainingIgnoreCase(string, string, string)
                .stream()
                .map(this.mapper::toProductDto)
                .collect(Collectors.toList())
                ;
    }

    public List<ProductDto> search(AdvancedSearchDto advancedSearchDto) {

        BooleanBuilder predicate = new BooleanBuilder();

        QProduct qProduct = QProduct.product;

        if (advancedSearchDto.getName() != null && !advancedSearchDto.getName().equals("")) {

            predicate.and(qProduct.name.containsIgnoreCase(advancedSearchDto.getName()));

        }

        if (advancedSearchDto.getCategoriesType() != null) {

            advancedSearchDto.getCategoriesType()
                    .forEach(categoryType -> {

                        predicate.and(qProduct.categories
                                .contains(this.categoryRepository.findByType(categoryType)));
                    });

        }

        if (advancedSearchDto.getMinimumPrice() != null && advancedSearchDto.getMaximumPrice() != null) {

            predicate.and(qProduct.purchasePrice.between(advancedSearchDto.getMinimumPrice(), advancedSearchDto.getMaximumPrice()));

        }

        if (advancedSearchDto.getQuantity()) {

            predicate.and(qProduct.quantity.gt(0));

        }

        if (advancedSearchDto.getSupplierName() != null) {

            predicate.and(qProduct.supplier.eq(this.supplierRepository.findByCompanyName(advancedSearchDto.getSupplierName())));

        }

        Iterable<Product> result = this.productRepository.findAll(predicate);

        return StreamSupport.stream(result.spliterator(), false)
                .map(mapper::toProductDto)
                .collect(Collectors.toList())
                ;

    }

    public Boolean partialUpdate(Map<String, Object> updates, Integer integer) throws IllegalAccessException {

        Product productToUpdate = this.mapper.toProductEntity(getById(integer));

        Class<?> clazz = Product.class;
        Field[] fields = clazz.getDeclaredFields();

        for (Map.Entry<String, Object> entry : updates.entrySet()) {

            Field field = Arrays.stream(fields)
                    .filter(f -> f.getName().equals(entry.getKey()))
                    .findFirst()
                    .orElseThrow(() -> new NoSuchElementException("La propriété de la classe n'a pas été trouvé"));

            field.setAccessible(true);
            field.set(productToUpdate, entry.getValue());

        }

        this.productRepository.save(productToUpdate);

        return true;

    }

}
