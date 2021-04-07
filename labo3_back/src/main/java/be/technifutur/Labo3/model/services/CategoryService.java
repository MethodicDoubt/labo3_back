package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.CategoryDto;
import be.technifutur.Labo3.model.entities.Category;
import be.technifutur.Labo3.model.repositories.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class CategoryService implements Crudable<Category, CategoryDto, Integer> {

    private final CategoryRepository categoryRepository;
    private final Mapper mapper;

    public CategoryService(CategoryRepository categoryRepository, Mapper mapper) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    @Override
    public List<CategoryDto> getAll() {

        return this.categoryRepository.findAllByOrderByCategoryId()
                .stream()
                .map(mapper::toCategoryDto)
                .collect(Collectors.toList());

    }

    public List<String> getAllType() {
        return new ArrayList<>(this.categoryRepository.findAllType());
    }

    @Override
    public CategoryDto getById(Integer integer) {

        Category category = this.categoryRepository.findById(integer).orElseThrow(() -> new NoSuchElementException("No category found with this ID"));

        return mapper.toCategoryDto(category);

    }

    @Override
    public boolean insert(Category category) {

        Category newCategory = this.categoryRepository.save(category);

        return this.categoryRepository.findById(newCategory.getCategoryId()).isPresent();

    }

    @Override
    public boolean update(Category category, Integer integer) {

        Category newCategory = new Category(category.getCategoryId(), category.getType());

        category.setCategoryId(integer);

        this.categoryRepository.save(category);

        return !newCategory.equals(this.categoryRepository.getOne(integer));

    }

    @Override
    public boolean delete(Integer integer) {

        this.categoryRepository.deleteById(integer);

        return this.categoryRepository.findById(integer).isEmpty();

    }

}
