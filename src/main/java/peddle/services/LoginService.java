package peddle.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserRegisterDtoRq;
import peddle.dto.UserRemindPassDtoRq;

import java.io.IOException;

public interface LoginService {

  ResponseEntity<?> auth(UserLoginDtoRq userLoginDtoRq);

  ResponseEntity<?> registerUser(UserRegisterDtoRq userAddDtoRq);

  ResponseEntity<?> confirmRegistration(String token);

  ResponseEntity<?> reminderUser(UserRemindPassDtoRq userRemindPassDtoRq);

  ResponseEntity<?> changePassUser(UserRemindPassDtoRq userRemindPassDtoRq);

  ResponseEntity<?> avatarUser(MultipartFile file) throws IOException;

}
