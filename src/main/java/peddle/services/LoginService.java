package peddle.services;

import org.springframework.http.ResponseEntity;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserRegisterDtoRq;

public interface LoginService {

  ResponseEntity<?> auth(UserLoginDtoRq userLoginDtoRq);

  ResponseEntity<?> registerUser(UserRegisterDtoRq userAddDtoRq);

  ResponseEntity<?> confirmRegistration(String token);

}
