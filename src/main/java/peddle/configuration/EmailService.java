package peddle.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@PropertySource("config.properties")
@Service
public class EmailService {

  @Value("${sendersMail}")
  private String sendersMail;

  @Autowired
  private JavaMailSender emailSender;

  @Autowired
  private MailContentBuilder mailContentBuilder;

  public void sendSimpleMessage(
      String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();

    message.setFrom(sendersMail);

    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    emailSender.send(message);
  }

  public void prepareAndSend(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(sendersMail);
    message.setTo(to);
    message.setSubject(subject);
    String content = mailContentBuilder.build(text);
//    System.out.println(content);
    message.setText(content);
    emailSender.send(message);
  }
}
