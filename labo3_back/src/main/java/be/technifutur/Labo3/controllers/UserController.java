package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.exceptionHandler.PasswordNotChangedException;
import be.technifutur.Labo3.model.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin
@RequestMapping("users")
public class UserController implements RestControllable<User, UserDto, Integer> {

    private final UserService userService;
    private final Mapper mapper;

    public UserController(UserService userService, Mapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @Override
    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {
        return ResponseEntity.ok(this.userService.getAll());
    }

    @Override
    public ResponseEntity<UserDto> getOne(Integer integer) {
        return null;
    }

    @Override
    @PostMapping
    public ResponseEntity<Boolean> insert(@RequestBody User user) {
        return ResponseEntity.ok(this.userService.insert(user));
    }

    @Override
    @PutMapping(path = "/{id}")
    public ResponseEntity<Boolean> update(@RequestBody User user, @PathVariable Integer id) {
        System.out.println(user.toString());
        System.out.println(id);
        return ResponseEntity.ok(this.userService.update(user, id));
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }

    @GetMapping("/{surname}")
    public ResponseEntity<UserDto> getBySurname(@PathVariable("surname") String surname) {
        return ResponseEntity.ok(this.mapper.toUserDto((User) this.userService.loadUserByUsername(surname), true));
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Map<String, String> map) {
        return ResponseEntity.ok(this.userService.login(map.get("surname"), map.get("password")));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Boolean> patch(@RequestBody Map<String, Object> userToPatch, @PathVariable Integer id) throws IllegalAccessException {
        return ResponseEntity.ok(this.userService.partialUpdate(userToPatch, id));
    }

    @PostMapping(path = "/changePassword")
    public ResponseEntity<Boolean> patch(@RequestBody User userToChangePassword) throws PasswordNotChangedException {
        return ResponseEntity.ok(this.userService.changePassword(userToChangePassword));
    }
}
