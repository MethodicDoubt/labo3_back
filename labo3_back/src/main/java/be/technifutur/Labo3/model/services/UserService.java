package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.exceptionHandler.UserNotFoundException;
import be.technifutur.Labo3.model.repositories.UserRepository;
import be.technifutur.Labo3.model.types.AccessLevel;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class UserService implements Crudable<User, UserDto, Integer> {

    private final UserRepository userRepository;
    private final Mapper mapper;

    public UserService(UserRepository userRepository, Mapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Override
    public List<UserDto> getAll() {
        return this.userRepository.findAllByOrderByUserId()
                .stream()
                .map(u -> this.mapper.toUserDto(u, true))
                .collect(Collectors.toList())
                ;
    }

    @Override
    public UserDto getById(Integer integer) {
        User user = this.userRepository.findById(integer).orElseThrow(() -> new UserNotFoundException("User not found"));
        return this.mapper.toUserDto(user, true);
    }

    @Override
    public boolean insert(User user) {
        if (user.getAccessLevel() == null)
            user.setAccessLevel(AccessLevel.CUSTOMER);
        user.setAccountNonExpired(true);
        user.setAccountNonExpired(true);
        user.setAccountNonExpired(true);
        user.setEnabled(true);
        User newUser = this.userRepository.save(user);
        return this.userRepository.existsById(newUser.getUserId());
    }

    @Override
    public boolean update(User user, Integer integer) {
        User old = this.userRepository.getOne(integer);
        User toTest = new User(
                old.getUserId(), old.getLastName(), old.getFirstName(), old.getAccessLevel(), old.getSurname()
                , old.getPassword(), old.getAddress(), old.getOrders(), old.getAvatar(), old.isAccountNonExpired()
                , old.isAccountNonLocked(), old.isCredentialsNonExpired(), old.isEnabled()
        );
        user.setUserId(integer);
        this.userRepository.save(user);
        return !toTest.equals(this.userRepository.getOne(integer));
    }

    @Override
    public boolean delete(Integer integer) {
        this.userRepository.deleteById(integer);
        return this.userRepository.existsById(integer);
    }

    public UserDto getBySurname(String surname) {
        return this.mapper.toUserDto(this.userRepository.findBySurnameEquals(surname));
    }

    public boolean login(String surname, String password) {
        User userToTest = this.userRepository.findBySurnameEquals(surname);
        return userToTest != null && userToTest.getPassword().equals(password);
    }

    public Boolean partialUpdate(Map<String, Object> updates, Integer id) throws IllegalAccessException {

        User userToPatch = this.userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User with id " + id + " not found"));

        Class<?> clazz = User.class;
        Field[] fields = clazz.getDeclaredFields();

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            Field field = Arrays.stream(fields)
                    .filter(f -> f.getName().equals(entry.getKey()))
                    .findAny()
                    .orElseThrow(() -> new NoSuchElementException("Property not found"));

            field.setAccessible(true);
            field.set(userToPatch, entry.getValue());
        }

        this.userRepository.save(userToPatch);

        return true;
    }
}
