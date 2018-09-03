package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import peddle.dto.UserAddDtoRq;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserDtoRs;
import peddle.dto.UserUpdateDtoRq;
import peddle.services.UserServiceImpl;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserServiceImpl userService;

  @PostMapping(path = "")
  @ResponseBody
  public UserDtoRs getUserByName(@RequestBody UserLoginDtoRq userLoginDtoRq) {
    UserDtoRs user = userService.getUserByName(userLoginDtoRq);
    return user;
  }

  @PostMapping(path = "/new")
  @ResponseBody
  public UserDtoRs addUser(@RequestBody UserAddDtoRq userAddDtoRq) {
    UserDtoRs user = userService.addUser(userAddDtoRq);
    return user;
  }

  @PostMapping(path = "/update")
  @ResponseBody
  public UserDtoRs updateUser(@RequestBody UserUpdateDtoRq userUpdateDtoRq) {
    UserDtoRs user = userService.updateUser(userUpdateDtoRq);
    return user;
  }

}
