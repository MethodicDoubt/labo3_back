package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.AdvancedSearchDto;
import be.technifutur.Labo3.model.dtos.ProductDto;
import be.technifutur.Labo3.model.entities.Product;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.exceptionHandler.ProductNotFoundException;
import be.technifutur.Labo3.model.services.ProductService;
import be.technifutur.Labo3.utils.AssociationProductUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin
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

    @PostMapping
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<Boolean> insert(@RequestBody AssociationProductUser productUser) throws IOException {
        return ResponseEntity.ok(this.productService.insert(productUser.getProduct(), productUser.getUser()));
    }

    @Override
    @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Integer integer) throws ProductNotFoundException {
        return ResponseEntity.ok(this.productService.delete(integer));
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getOne(@PathVariable("id") Integer integer) {
        return ResponseEntity.ok(this.productService.getById(integer));
    }


    // useless

    @Override
    public ResponseEntity<Boolean> insert(Product product) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> update(Product product, Integer integer) {
        return null;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<Boolean> update(@RequestBody AssociationProductUser productUser, @PathVariable("id") Integer id) throws IOException {
        return ResponseEntity.ok(this.productService.update(productUser.getProduct(), productUser.getUser(), id));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ProductDto>> search(@RequestBody Product product) {
        return ResponseEntity.ok(this.productService.findByNameOrCategoryOrSupplier(product.getName()));
    }

    @PostMapping(path = "/advsearch", params = {"page", "size"})
    public ResponseEntity<Page<ProductDto>> advSearch(@RequestBody AdvancedSearchDto advancedSearchDto, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(this.productService.search(advancedSearchDto, page, size));
    }

    @PatchMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<Boolean> patch(@RequestBody Map<String, Object> productToPatch, @PathVariable Integer id) throws IllegalAccessException {
        return ResponseEntity.ok(this.productService.partialUpdate(productToPatch, id));
    }

}
