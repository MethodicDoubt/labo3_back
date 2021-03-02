package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.AdvancedSearchDto;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.Supplier;
import be.technifutur.Labo3.model.entities.QProduct;
import be.technifutur.Labo3.model.repositories.OrderRepository;
import be.technifutur.Labo3.model.repositories.ProductRepository;
import com.querydsl.core.BooleanBuilder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService implements Crudable<Product, ProductDto, Integer> {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    private final Mapper mapper;


    public ProductService(ProductRepository productRepository, OrderRepository orderRepository, Mapper mapper) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.mapper = mapper;
    }


    @Override
    public List<ProductDto> getAll() {
        return this.productRepository.findAll()
                .stream()
                .map(p -> mapper.toProductDto(p, true))
                .collect(Collectors.toList());
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
                oldProduct.getVat(),
                oldProduct.getOrders());

        product.setProductId(integer);
        product.setUpdateDate(Instant.now());

        this.productRepository.save(product);

        return !newProduct.equals(this.productRepository.getOne(integer));

    }

    @Override
    public boolean delete(Integer integer) {

        this.productRepository.deleteById(integer);

        return this.productRepository.findById(integer).isEmpty();

    }

    public List<ProductDto> findByNameOrCategoryOrSupplier(String string) {
        return this.productRepository.findDistinctByCategoriesTypeContainingIgnoreCaseOrSupplierCompanyNameContainingIgnoreCaseOrNameContainingIgnoreCase(string, string,string)
                .stream()
                .map(this.mapper::toProductDto)
                .collect(Collectors.toList())
                ;
    }
    
    public List<ProductDto> search(AdvancedSearchDto advancedSearchDto) {

        System.out.println(advancedSearchDto);

        BooleanBuilder predicate = new BooleanBuilder();

        QProduct qProduct = QProduct.product;

        if (advancedSearchDto.getName() != null && !advancedSearchDto.getName().equals("")) {

            predicate.and(qProduct.name.containsIgnoreCase(advancedSearchDto.getName()));

        }

        if (advancedSearchDto.getCategoriesDto() != null) {

            advancedSearchDto.getCategoriesDto()
                    .forEach(categoryDto -> {predicate.and(qProduct.categories
                            .contains(mapper.toCategoryEntity(categoryDto)));});

        }

        if (advancedSearchDto.getMinimumPrice() != null && advancedSearchDto.getMaximumPrice() != null) {

            predicate.and(qProduct.purchasePrice.between(advancedSearchDto.getMinimumPrice(), advancedSearchDto.getMaximumPrice()));

        }

        if (advancedSearchDto.getQuantity()) {

            predicate.and(qProduct.quantity.gt(0));

        }

        if (advancedSearchDto.getSupplierDto() != null) {

            predicate.and(qProduct.supplier.eq(mapper.toSupplierEntity(advancedSearchDto.getSupplierDto())));

        }

        Iterable<Product> result = this.productRepository.findAll(predicate);

        return StreamSupport.stream(result.spliterator(), false)
                .map(mapper::toProductDto)
                .collect(Collectors.toList());

    }

}
