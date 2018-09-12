package peddle.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import peddle.entities.User;
import peddle.repository.UserRepository;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private UserRepository userRepository;

  @Autowired
  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByNameIgnoreCase(name);
    if (user.isPresent()) {
      return new UserPrincipal(user.get());
    }
    throw new UsernameNotFoundException("User not found with username or email : " + name);
  }

  public UserDetails loadUserById(Long id) {
    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      return new UserPrincipal(user.get());
    }
    throw new UsernameNotFoundException("User not found with id : " + id);
  }
}
