package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.AdvancedSearchDto;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.Supplier;
import be.technifutur.Labo3.model.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping(params = {"page", "size"})
    public ResponseEntity<Page<ProductDto>> getAllWithPagination(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(this.productService.getAllWithPagination(page, size));
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

    @PostMapping("/search")
    public ResponseEntity<List<ProductDto>> search(@RequestBody Product product) {
        return ResponseEntity.ok(this.productService.findByNameOrCategoryOrSupplier(product.getName()));   
    }
    
    @PostMapping(path = "/advsearch")
    public ResponseEntity<List<ProductDto>> advSearch(@RequestBody AdvancedSearchDto advancedSearchDto) {

        return ResponseEntity.ok(this.productService.search(advancedSearchDto));

    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Boolean> patch(@RequestBody Map<String, Object> productToPatch, @PathVariable Integer id) throws IllegalAccessException {

        return ResponseEntity.ok(this.productService.partialUpdate(productToPatch, id));

    }

}
