package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.CategoryDto;
import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<CategoryDto>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<CategoryDto> getOne(Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> insert(Category category) {
        return null;
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