package peddle.services;

import org.springframework.http.ResponseEntity;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserRegisterDtoRq;
import peddle.dto.UserRemindPassDtoRq;

public interface LoginService {

  ResponseEntity<?> auth(UserLoginDtoRq userLoginDtoRq);

  ResponseEntity<?> registerUser(UserRegisterDtoRq userAddDtoRq);

  ResponseEntity<?> confirmRegistration(String token);

  ResponseEntity<?> reminderUser(UserRemindPassDtoRq userRemindPassDtoRq);

  ResponseEntity<?> changePassUser(UserRemindPassDtoRq userRemindPassDtoRq);

}
