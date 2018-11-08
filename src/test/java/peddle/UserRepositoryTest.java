package peddle;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import peddle.entities.User;
import peddle.repository.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest(classes = Application.class)
public class UserRepositoryTest {

    private final static String USER_NAME = "Alex";
    private final static String USER_NAME2 = "Jon";
    private final static String USER_EMAIL = "ch.yuriy@ukr.net";
    private final static String USER_PASSWD = "pwdAlex";
    private final static boolean USER_ACTIVE = true;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void before(){
        new UserBefore(userRepository).createNewUser(USER_NAME, USER_EMAIL, USER_PASSWD, USER_ACTIVE);
    }

    @After
    public void after(){
        userRepository.deleteUserByName(USER_NAME);
        Assert.assertNull(userRepository.findByNameIgnoreCase(USER_NAME).orElse(null));
    }

    @Test
    public void getUserTest(){
        Assert.assertNotNull(userRepository.findByNameIgnoreCase(USER_NAME));
    }

    @Test
    public void getUserByMailTest(){
        Assert.assertNotNull(userRepository.findByEmail("ch.yuriy@ukr.net"));
    }

    @Test
    public void saveUserTest(){
        Assert.assertNotNull(userRepository.findByNameIgnoreCase(USER_NAME));
    }

    @Test
    public void updateUserTest(){
        User updateUser = userRepository.findByNameIgnoreCase(USER_NAME).get();
        updateUser.setName("Jon");
        userRepository.save(updateUser);
        Assert.assertEquals(updateUser, userRepository.findByNameIgnoreCase(USER_NAME2).get());
        userRepository.deleteUserByName(USER_NAME2);
        Assert.assertNull(userRepository.findByNameIgnoreCase(USER_NAME2).orElse(null));
    }

    @Test
    public void deleteUserTest(){
        Assert.assertNotNull(userRepository.findByNameIgnoreCase(USER_NAME));
        userRepository.deleteUserByName(USER_NAME);
        Assert.assertNull(userRepository.findByNameIgnoreCase(USER_NAME).orElse(null));
    }

}
