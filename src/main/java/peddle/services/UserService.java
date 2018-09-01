package peddle.services;

import peddle.dto.UserAddDtoRq;
import peddle.dto.UserDtoRq;
import peddle.dto.UserDtoRs;
import peddle.dto.UserUpdateDtoRq;

public interface UserService {

  UserDtoRs getUserByName(UserDtoRq userDtoRq);

  UserDtoRs addUser(UserAddDtoRq userAddDtoRq);

  UserDtoRs updateUser(UserUpdateDtoRq userUpdateDtoRq);

}
