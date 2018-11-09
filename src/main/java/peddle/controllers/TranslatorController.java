package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.TranslatorDto;
import peddle.services.TranslatorServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
public class TranslatorController {
  @Autowired
  private TranslatorServiceImpl translatorService;


  @RequestMapping(path = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<TranslatorDto> getAll() {
    return translatorService.getAll();
  }
}
