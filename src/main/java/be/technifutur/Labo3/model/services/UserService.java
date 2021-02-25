package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.repositories.UserRepository;
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
        User newUser = this.userRepository.save(user);
        return this.userRepository.existsById(newUser.getUserId());
    }

    @Override
    public boolean update(User user, Integer integer) {
        User old = this.userRepository.getOne(integer);
        User toTest = new User(
                old.getUserId(), old.getLastName(), old.getFirstName(), old.getAccessLevel(), old.getSurname()
                , old.getPassword(), old.getAddress(), old.getOrders(), old.getAvatar()
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
}