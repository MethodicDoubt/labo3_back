package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.repositories.UserRepository;
import be.technifutur.Labo3.model.types.AccessLevel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return this.userRepository.findAll()
                .stream()
                .map(u -> this.mapper.toUserDto(u, true))
                .collect(Collectors.toList())
                ;
    }

    @Override
    public UserDto getById(Integer integer) {
        User user = this.userRepository.findById(integer).orElseThrow(() -> new NoSuchElementException("User not found"));
        return this.mapper.toUserDto(user, true);
    }

    @Override
    public boolean insert(User user) {
        if (user.getAccessLevel() == null)
            user.setAccessLevel(AccessLevel.CUSTOMER);
        user.setIsActive(true);
        User newUser = this.userRepository.save(user);
        return this.userRepository.existsById(newUser.getUserId());
    }

    @Override
    public boolean update(User user, Integer integer) {
        User old = this.userRepository.getOne(integer);
        User toTest = new User(
                old.getUserId(), old.getLastName(), old.getFirstName(), old.getAccessLevel(), old.getSurname()
                , old.getPassword(), old.getAddress(), old.getIsActive(), old.getOrders(), old.getAvatar()
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
}
