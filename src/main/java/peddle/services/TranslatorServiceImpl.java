package peddle.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import peddle.dto.TranslatorDto;
import peddle.repository.TranslatorRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class TranslatorServiceImpl implements TranslatorService {

  @Autowired
  private TranslatorRepository translatorRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public List<TranslatorDto> getAll() {
    List<TranslatorDto> translatorDtos = new ArrayList<>();
    translatorRepository.findAll(Sort.by("language"))
        .forEach(translator -> translatorDtos.add(modelMapper.map(translator, TranslatorDto.class)));
    return translatorDtos;
  }
}
