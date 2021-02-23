package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;

import java.util.List;

public class UserService implements Crudable<User, UserDto,Integer> {
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
