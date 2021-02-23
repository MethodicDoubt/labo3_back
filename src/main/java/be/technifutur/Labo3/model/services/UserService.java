package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return null;
    }

    @Override
    public UserDto getById(Integer integer) {
        return null;
    }

    @Override
    public boolean insert(User user) {
        return false;
    }

    @Override
    public boolean update(User user, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }
}
