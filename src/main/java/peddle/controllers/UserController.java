package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import peddle.dto.UserDtoRq;
import peddle.dto.UserDtoRs;
import peddle.services.UserServiceImpl;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserServiceImpl userService;

  @PostMapping(path = "")
  @ResponseBody
  public UserDtoRs getUserByName(@RequestBody UserDtoRq userDtoRq) {
    UserDtoRs user = userService.getUserByName(userDtoRq);
    return user;
  }


}
