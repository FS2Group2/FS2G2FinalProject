package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peddle.configuration.BadRequestException;
import peddle.dto.UserDtoRq;
import peddle.dto.UserDtoRs;
import peddle.entities.User;
import peddle.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public UserDtoRs getUserByName(UserDtoRq userDtoRq) {
    User user = userRepository.findByNameIgnoreCase(userDtoRq.getName());
    return modelMapper.map(user, UserDtoRs.class);
  }
}
