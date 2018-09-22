package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import peddle.dto.ApiRs;
import peddle.dto.JwtAuthenticationRs;
import peddle.dto.UserLoginDtoRq;
import peddle.dto.UserRegisterDtoRq;
import peddle.entities.Profile;
import peddle.entities.Role;
import peddle.entities.User;
import peddle.repository.RoleRepository;
import peddle.repository.UserRepository;
import peddle.security.JwtTokenProvider;

import java.util.Optional;
import java.util.UUID;

@Service
public class LoginServiceImpl implements LoginService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Autowired
  private PasswordEncoder passwordEncoder;


  @Autowired
  private ModelMapper modelMapper;

  @Override
  public ResponseEntity<?> auth(UserLoginDtoRq userLoginDtoRq) {
    Optional<User> currentUser = userRepository.findByNameIgnoreCase(userLoginDtoRq.getName());

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            userLoginDtoRq.getName(),
            userLoginDtoRq.getPassword()
        )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = tokenProvider.generateToken(authentication);
    return ResponseEntity.ok(new JwtAuthenticationRs(jwt));
  }

  @Override
  public ResponseEntity<?> registerUser(UserRegisterDtoRq userRegisterDtoRq) {
    Optional<User> userNameCheck = userRepository.findByNameIgnoreCase(userRegisterDtoRq.getName());
    if (userNameCheck.isPresent()) {
      return new ResponseEntity(new ApiRs(false, "UserName is already taken!"),
          HttpStatus.BAD_REQUEST);
    }

    Optional<User> emailNameCheck = userRepository.findByEmail(userRegisterDtoRq.getEmail());
    if (emailNameCheck.isPresent()) {
      return new ResponseEntity(new ApiRs(false, "Email already is used! "),
          HttpStatus.BAD_REQUEST);
    }

    User newUser = modelMapper.map(userRegisterDtoRq, User.class);
    newUser.setFirstName("");
    newUser.setLastName("");
    /*
    City city = cityRepository.findById(userAddDtoRq.getCity()).get();
    newUser.setCity(new City(""));
    */
    Profile profile = new Profile("","unknown_user.png", "");
    newUser.setProfile(profile);
    Role role = roleRepository.findByName("CUSTOMER");
    newUser.setRole(role);
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    newUser.setActive(false);

    userRepository.save(newUser);
    /*
    UserToken userToken = new UserToken();
    userToken.setUser(newUser);
    String token = UUID.randomUUID().toString();
    userToken.setToken(token);
    userTokenRepository.save(userToken);

    String message = "Thank you for registering in Mention! To finish your "
        + "registration, please follow the link: "
        + "http://localhost:3000/registration/" + token;
    String to = newUser.getEmail();
    String subject = "Confirm your email";
    emailService.sendSimpleMessage(to, subject, message);
    */
    return ResponseEntity.ok(new ApiRs(true,
        "User registered successfully! Check your inbox for confirmation!"));
  }
}
