package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import peddle.dto.UserAddDtoRq;
import peddle.dto.UserChangePasswordDtoRq;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserDtoRs;
import peddle.dto.UserUpdateDtoRq;
import peddle.repository.UserRepository;
import peddle.services.UserServiceImpl;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserServiceImpl userService;

  @Autowired
  private UserRepository userRepository;

  @PostMapping(path = "")
  public UserDtoRs getUserByName(@RequestBody UserLoginDtoRq userLoginDtoRq) {
    UserDtoRs user = userService.getUserByName(userLoginDtoRq);
    return user;
  }

  @PostMapping(path = "/new")
  public UserDtoRs addUser(@RequestBody UserAddDtoRq userAddDtoRq) {
    UserDtoRs user = userService.addUser(userAddDtoRq);
    return user;
  }

  @PostMapping(path = "/update")
  public UserDtoRs updateUser(@RequestBody UserUpdateDtoRq userUpdateDtoRq) {
    UserDtoRs user = userService.updateUser(userUpdateDtoRq);
    return user;
  }

  @PostMapping(path = "/update/pass")
  public UserDtoRs changePassword(@RequestBody UserChangePasswordDtoRq userChangePasswordDtoRq) {
    UserDtoRs user = userService.changePassword(userChangePasswordDtoRq);
    return user;
  }

}
