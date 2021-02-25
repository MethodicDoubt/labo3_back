package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.LogDto;
import be.technifutur.Labo3.model.entities.Log;
import be.technifutur.Labo3.model.repositories.LogRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class LogService implements Crudable<Log, LogDto, Integer> {

    private final LogRepository logRepository;
    private final Mapper mapper;

    public LogService(LogRepository logRepository, Mapper mapper) {
        this.logRepository = logRepository;
        this.mapper = mapper;
    }

    @Override
    public List<LogDto> getAll() {
        return this.logRepository.findAll()
                .stream()
                .map(this.mapper::toLogDto)
                .collect(Collectors.toList())
                ;
    }

    @Override
    public LogDto getById(Integer integer) {
        Log log = this.logRepository.findById(integer).orElseThrow(() -> new NoSuchElementException("Log not found"));
        return this.mapper.toLogDto(log);
    }

    @Override
    public boolean insert(Log log) {
        log.setCreationDate(Instant.now());
        Log newLog = this.logRepository.save(log);
        return this.logRepository.existsById(newLog.getLogId());
    }

    @Override
    public boolean update(Log log, Integer integer) {
        Log old = this.logRepository.getOne(integer);
        Log toTest = new Log(
                old.getLogId(), old.getPrice(), old.getCreationDate(),
                old.getProduct(), old.getUser()
        );
        log.setLogId(integer);
        this.logRepository.save(log);
        return !toTest.equals(this.logRepository.getOne(integer));
    }

    @Override
    public boolean delete(Integer integer) {
        this.logRepository.deleteById(integer);
        return this.logRepository.existsById(integer);
    }
}
