package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserRegisterDtoRq;
import peddle.services.LoginServiceImpl;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class LoginController {

  @Autowired
  private LoginServiceImpl loginService;

  @PostMapping(path = "/login")
  public ResponseEntity<?> loginUserByName(@RequestBody UserLoginDtoRq userLoginDtoRq) {
    return loginService.auth(userLoginDtoRq);
  }

  @PostMapping(path = "/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterDtoRq userRegisterDtoRq) {
    return loginService.registerUser(userRegisterDtoRq);
  }

}