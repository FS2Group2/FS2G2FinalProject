package peddle;

import org.junit.Assert;
import peddle.entities.User;
import peddle.repository.UserRepository;

public class UserBefore {

    private UserRepository userRepository;

    public UserBefore(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createNewUser(String name, String email, String password, boolean isActive){
        Assert.assertNull(userRepository.findByNameIgnoreCase(name).orElse(null));
        User user = new User(name, email, password, isActive);
        userRepository.save(user);
        Assert.assertNotNull(userRepository.findByNameIgnoreCase(name).orElse(null));
    }
}
