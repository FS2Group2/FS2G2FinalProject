package peddle.services;

import peddle.dto.UserAddDtoRq;
import peddle.dto.UserChangePasswordDtoRq;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserDtoRs;
import peddle.dto.UserUpdateDtoRq;

public interface UserService {

  UserDtoRs getUserByName(UserLoginDtoRq userLoginDtoRq);

  UserDtoRs addUser(UserAddDtoRq userAddDtoRq);

  UserDtoRs updateUser(UserUpdateDtoRq userUpdateDtoRq);

  UserDtoRs changePassword(UserChangePasswordDtoRq userChangePasswordDtoRq);

}
