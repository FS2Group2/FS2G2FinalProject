package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import peddle.configuration.AmazonS3Configuration;
import peddle.configuration.BadRequestException;
import peddle.configuration.ErrorConstants;
import peddle.dto.UserAddDtoRq;
import peddle.dto.UserChangePasswordDtoRq;
import peddle.dto.UserDtoRs;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserUpdateDtoRq;
import peddle.entities.City;
import peddle.entities.Role;
import peddle.entities.User;
import peddle.repository.CityRepository;
import peddle.repository.RoleRepository;
import peddle.repository.UserRepository;
import peddle.security.JwtTokenProvider;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public UserDtoRs getUserByName(UserLoginDtoRq userLoginDtoRq) {
    User user = userRepository.findByNameIgnoreCase(userLoginDtoRq.getName())
            .orElseThrow(()-> new BadRequestException(ErrorConstants.ERR_USER_NOT_FOUND));
    return modelMapper.map(user, UserDtoRs.class);
  }

  @Override
  public UserDtoRs addUser(UserAddDtoRq userAddDtoRq) {
    if (userRepository.findByNameIgnoreCase(userAddDtoRq.getName()).isPresent()) {
      return null;
    } else {
      User user = modelMapper.map(userAddDtoRq, User.class);
      City city = cityRepository.findById(userAddDtoRq.getCity()).get();
      user.setCity(city);
      Role role = roleRepository.findById(userAddDtoRq.getRole()).get();
      user.setRole(role);
      User userNew = userRepository.save(user);
      return modelMapper.map(userNew, UserDtoRs.class);
    }
  }

  @Override
  public UserDtoRs updateUser(UserUpdateDtoRq userUpdateDtoRq) {
    User user = userRepository.findById(userUpdateDtoRq.getUserId()).get();
    modelMapper.map(userUpdateDtoRq, user);
    if (cityRepository.findById(userUpdateDtoRq.getCity()).isPresent()) {
      City city = cityRepository.findById(userUpdateDtoRq.getCity()).get();
      user.setCity(city);
    }
    if (roleRepository.findById(userUpdateDtoRq.getRole()).isPresent()) {
      Role role = roleRepository.findById(userUpdateDtoRq.getRole()).get();
      user.setRole(role);
    }
    User userNew = userRepository.save(user);
    return modelMapper.map(userNew, UserDtoRs.class);
  }

  @Override
  public UserDtoRs changePassword(UserChangePasswordDtoRq userChangePasswordDtoRq) {
    return null;
  }

}
