package peddle.services;

import org.springframework.http.ResponseEntity;
import peddle.dto.UserLoginDtoRq;

public interface LoginService {

  ResponseEntity<?> auth(UserLoginDtoRq userLoginDtoRq);

}
