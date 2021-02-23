package be.technifutur.Labo3.mapper;

import be.technifutur.Labo3.model.dtos.CategoryDto;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.dtos.SupplierDto;
import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.Supplier;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class Mapper {

    public ProductDto toProductDto(Product product){

        return toProductDto(product, false);

    }

    public ProductDto toProductDto(Product product, Boolean withOrder){

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
                .build();

    }

    public Product toProductEntity(ProductDto productDto){

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
                .orders(productDto.getOrdersDto().stream().map(this::toOrderEntity).collect(Collectors.toList()))
                .build();

    }




    public CategoryDto toCategoryDto(Category category){

        return CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .type(category.getType())
                .build();

    }

    public Category toCategoryEntity(CategoryDto categoryDto){

        return Category.builder()
                .categoryId(categoryDto.getCategoryId())
                .type(categoryDto.getType())
                .build();

    }




    public SupplierDto toSupplierDto(Supplier supplier){

        return SupplierDto.builder()
                .supplierId(supplier.getSupplierId())
                .companyName(supplier.getCompanyName())
                .juridicalStatus(supplier.getJuridicalStatus())
                .sector(supplier.getSector())
                .insertionDate(supplier.getInsertionDate())
                .updateDate(supplier.getUpdateDate())
                .build();

    }

    public Supplier toSupplierEntity(SupplierDto supplierDto){

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
