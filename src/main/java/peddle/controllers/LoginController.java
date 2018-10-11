package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserRegisterDtoRq;
import peddle.dto.UserRemindPassDtoRq;
import peddle.services.LoginServiceImpl;

import javax.validation.Valid;
import java.io.IOException;

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

  @GetMapping("/register/{token}")
  public ResponseEntity<?> confirmRegistration(@PathVariable String token) {
    return loginService.confirmRegistration(token);
  }

  @PostMapping(path = "/remind")
  public ResponseEntity<?> remindUser(@Valid @RequestBody UserRemindPassDtoRq userRemindPassDtoRq) {
    return loginService.reminderUser(userRemindPassDtoRq);
  }

  @PostMapping(path = "/remind/changePass")
  public ResponseEntity<?> changePassUser(@Valid @RequestBody UserRemindPassDtoRq userRemindPassDtoRq) {
    return loginService.changePassUser(userRemindPassDtoRq);
  }

  @PostMapping(path = "/avatar")
  public ResponseEntity<?> avatarUser(@RequestParam(value = "image") MultipartFile file) throws IOException {
    return loginService.avatarUser(file);
  }
}