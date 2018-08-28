package peddle.services;

import peddle.dto.UserDtoRq;
import peddle.dto.UserDtoRs;

public interface UserService {

  UserDtoRs getUserByName(UserDtoRq userDtoRq);

}
