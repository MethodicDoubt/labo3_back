package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.CategoryDto;
import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("categories")
public class CategoryController implements RestControllable<Category, CategoryDto, Integer> {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(path = "/{type}")
    public ResponseEntity<List<String>> getAllType() {

        return ResponseEntity.ok(this.categoryService.getAllType());

    }

    @Override
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll() {
        return ResponseEntity.ok(this.categoryService.getAll());
    }

    @Override
    public ResponseEntity<CategoryDto> getOne(Integer integer) {
        return null;
    }

    @Override
    @PostMapping
    public ResponseEntity<Boolean> insert(@RequestBody Category category) {
        return ResponseEntity.ok(this.categoryService.insert(category));
    }

    @Override
    public ResponseEntity<Boolean> update(Category category, Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }

}
