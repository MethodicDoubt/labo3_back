package be.technifutur.Labo3.mapper;

import be.technifutur.Labo3.model.dtos.*;
import be.technifutur.Labo3.model.entities.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class Mapper {

    public UserDto toUserDto(User user) {
        return toUserDto(user, false);
    }

    public UserDto toUserDto(User user, Boolean withOrders) {
        return UserDto.builder()
                .userId(user.getUserId())
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .accessLevel(user.getAccessLevel())
                .surname(user.getSurname())
                .address(user.getAddress())
                .ordersDto(withOrders ?
                        user.getOrders()
                                .stream()
                                .map(this::toOrderDto)
                                .collect(Collectors.toList()) : null
                )
                .isAccountNonExpired(user.isAccountNonExpired())
                .isAccountNonLocked(user.isAccountNonLocked())
                .isEnabled(user.isEnabled())
                .isCredentialsNonExpired(user.isCredentialsNonExpired())
                .build();
    }

    public User toUserEntity(UserDto userDto) {
        return User.builder()
                .userId(userDto.getUserId())
                .lastName(userDto.getLastName())
                .firstName(userDto.getFirstName())
                .accessLevel(userDto.getAccessLevel())
                .surname(userDto.getSurname())
                .password(userDto.getPassword())
                .address(userDto.getAddress())
                .orders(
                        userDto.getOrdersDto()
                                .stream()
                                .map(this::toOrderEntity)
                                .collect(Collectors.toList())
                )
                .isAccountNonExpired(userDto.isAccountNonExpired())
                .isAccountNonLocked(userDto.isAccountNonLocked())
                .isEnabled(userDto.isEnabled())
                .isCredentialsNonExpired(userDto.isCredentialsNonExpired())
                .build();
    }

    public OrderDto toOrderDto(Order order) {
        return toOrderDto(order, false, false);
    }

    public OrderDto toOrderDto(Order order, Boolean withUser, Boolean withProducts) {
        return OrderDto.builder()
                .orderId(order.getOrderId())
                .reference(order.getReference())
                .creationDate(order.getCreationDate())
                .isPaid(order.getIsPaid())
                .payementMethod(order.getPayementMethod())
                .userDto(withUser ?
                        toUserDto(order.getUser()) : null
                )
                .productsDto(withProducts ?
                        order.getProducts()
                                .stream()
                                .map(this::toProductDto)
                                .collect(Collectors.toList()) : null
                )
                .build();
    }

    public Order toOrderEntity(OrderDto orderDto) {
        return Order.builder()
                .orderId(orderDto.getOrderId())
                .reference(orderDto.getReference())
                .creationDate(orderDto.getCreationDate())
                .isPaid(orderDto.getIsPaid())
                .payementMethod(orderDto.getPayementMethod())
                .user(orderDto.getUserDto() != null ? toUserEntity(orderDto.getUserDto()) : null)
                .products(orderDto.getProductsDto() != null ?
                        orderDto.getProductsDto()
                                .stream()
                                .map(this::toProductEntity)
                                .collect(Collectors.toList()) : null
                )
                .build();
    }

    public LogDto toLogDto(Log log) {
        return LogDto.builder()
                .logId(log.getLogId())
                .price(log.getPrice())
                .creationDate(log.getCreationDate())
                .productDto(toProductDto(log.getProduct()))
                .userDto(toUserDto(log.getUser()))
                .build();
    }

    public Log toLogEntity(LogDto logDto) {
        return Log.builder()
                .logId(logDto.getLogId())
                .price(logDto.getPrice())
                .creationDate(logDto.getCreationDate())
                .product(toProductEntity(logDto.getProductDto()))
                .user(toUserEntity(logDto.getUserDto()))
                .build();
    }


    public ProductDto toProductDto(Product product) {

        return toProductDto(product, false);

    }

    public ProductDto toProductDto(Product product, Boolean withOrder) {

        return ProductDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .categoriesDto(product.getCategories().stream().map(this::toCategoryDto).collect(Collectors.toList()))
                .entryDate(product.getEntryDate())
                .updateDate(product.getUpdateDate())
                .expirationDate(product.getExpirationDate())
                .purchasePrice(product.getPurchasePrice())
                .quantity(product.getQuantity())
                .supplierDto(toSupplierDto(product.getSupplier()))
                .productImage(product.getProductImage())
                .vat(product.getVat())
                .ordersDto(withOrder ? product.getOrders().stream().map(this::toOrderDto).collect(Collectors.toList()) : null)
                .isActive(product.getIsActive())
                .build();

    }

    public Product toProductEntity(ProductDto productDto) {

        return Product.builder()
                .productId(productDto.getProductId())
                .name(productDto.getName())
                .description(productDto.getDescription())
                .categories(productDto.getCategoriesDto().stream().map(this::toCategoryEntity).collect(Collectors.toList()))
                .entryDate(productDto.getEntryDate())
                .updateDate(productDto.getUpdateDate())
                .expirationDate(productDto.getExpirationDate())
                .purchasePrice(productDto.getPurchasePrice())
                .quantity(productDto.getQuantity())
                .supplier(toSupplierEntity(productDto.getSupplierDto()))
                .productImage(productDto.getProductImage())
                .vat(productDto.getVat())
                .orders(productDto
                        .getOrdersDto()
                        .stream()
                        .map(this::toOrderEntity)
                        .collect(Collectors.toList())
                )
                .isActive(productDto.getIsActive())
                .build();

    }


    public CategoryDto toCategoryDto(Category category) {

        return CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .type(category.getType())
                .build();

    }

    public Category toCategoryEntity(CategoryDto categoryDto) {

        return Category.builder()
                .categoryId(categoryDto.getCategoryId())
                .type(categoryDto.getType())
                .build();

    }


    public SupplierDto toSupplierDto(Supplier supplier) {

        return SupplierDto.builder()
                .supplierId(supplier.getSupplierId())
                .companyName(supplier.getCompanyName())
                .juridicalStatus(supplier.getJuridicalStatus())
                .sector(supplier.getSector())
                .insertionDate(supplier.getInsertionDate())
                .updateDate(supplier.getUpdateDate())
                .build();

    }

    public Supplier toSupplierEntity(SupplierDto supplierDto) {

        return Supplier.builder()
                .supplierId(supplierDto.getSupplierId())
                .companyName(supplierDto.getCompanyName())
                .juridicalStatus(supplierDto.getJuridicalStatus())
                .sector(supplierDto.getSector())
                .insertionDate(supplierDto.getInsertionDate())
                .updateDate(supplierDto.getUpdateDate())
                .build();

    }

}
