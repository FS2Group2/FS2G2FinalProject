package peddle.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {

  public static final String TEMPLATE_EMAIL = "mailTemplate";

  private TemplateEngine templateEngine;

  @Autowired
  public MailContentBuilder(TemplateEngine templateEngine) {
    this.templateEngine = templateEngine;
  }

  public String build(String message, String url) {
    Context context = new Context();
    context.setVariable("message", message);
    context.setVariable("reference", url);
    return templateEngine.process(TEMPLATE_EMAIL, context);
  }

}
