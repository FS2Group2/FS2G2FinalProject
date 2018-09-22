package peddle.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import peddle.dto.JwtAuthenticationRs;
import peddle.dto.UserLoginDtoRq;
import peddle.entities.User;
import peddle.repository.UserRepository;
import peddle.security.JwtTokenProvider;

import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenProvider tokenProvider;

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
}
