package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController implements RestControllable<Product, ProductDto, Integer> {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @Override
    public ResponseEntity<List<ProductDto>> getAll() {
        return null;
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getOne(@PathVariable("id") Integer integer) {
        return ResponseEntity.ok(this.productService.getById(integer));
    }

    @Override
    public ResponseEntity<Boolean> insert(Product product) {
        return null;
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> update(Product product,@PathVariable("id") Integer integer) {
        return ResponseEntity.ok(this.productService.update(product,integer));
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }
}
