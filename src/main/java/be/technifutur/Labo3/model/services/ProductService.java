package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements Crudable<Product, ProductDto, Integer> {

    private final ProductRepository productRepository;

    private final Mapper mapper;


    public ProductService(ProductRepository productRepository, Mapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }


    @Override
    public List<ProductDto> getAll() {
        return this.productRepository.findAll()
                .stream()
                .map(p -> mapper.to);
    }

    @Override
    public ProductDto getById(Integer integer) {
        return null;
    }

    @Override
    public boolean insert(Product product) {
        return false;
    }

    @Override
    public boolean update(Product product, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }

}
