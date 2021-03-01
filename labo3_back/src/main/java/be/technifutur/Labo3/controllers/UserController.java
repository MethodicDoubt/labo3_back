package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.UserDto;
import be.technifutur.Labo3.model.entities.User;
import be.technifutur.Labo3.model.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("users")
public class UserController implements RestControllable<User, UserDto, Integer> {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<List<UserDto>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<UserDto> getOne(Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> insert(User user) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> update(User user, Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }

    @GetMapping("/{surname}")
    public ResponseEntity<UserDto> getBySurname(@PathVariable("surname") String surname) {
        return ResponseEntity.ok(this.userService.getBySurname(surname));
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Map<String, String> map) {
        return ResponseEntity.ok(this.userService.login(map.get("surname"), map.get("password")));
    }
}
