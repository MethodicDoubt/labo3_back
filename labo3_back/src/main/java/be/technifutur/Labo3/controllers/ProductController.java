package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.AdvancedSearchDto;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("products")
public class ProductController implements RestControllable<Product, ProductDto, Integer> {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Override
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAll() {
        return ResponseEntity.ok(this.productService.getAll());
    }

    @Override
    @PostMapping
    public ResponseEntity<Boolean> insert(@Valid @RequestBody Product product) {
        return ResponseEntity.ok(this.productService.insert(product));
    }

    @Override
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Integer integer) {
        return ResponseEntity.ok(this.productService.delete(integer));
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getOne(@PathVariable("id") Integer integer) {
        return ResponseEntity.ok(this.productService.getById(integer));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> update(Product product, @PathVariable("id") Integer integer) {
        return ResponseEntity.ok(this.productService.update(product, integer));
    }

    @PostMapping(path = "/search")
    public ResponseEntity<List<ProductDto>> search(@RequestBody AdvancedSearchDto advancedSearchDto) {

        return ResponseEntity.ok(this.productService.search(advancedSearchDto));

    }

}
