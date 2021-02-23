package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.LogDto;
import be.technifutur.Labo3.model.entities.Log;
import be.technifutur.Labo3.model.repositories.LogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return null;
    }

    @Override
    public LogDto getById(Integer integer) {
        return null;
    }

    @Override
    public boolean insert(Log log) {
        return false;
    }

    @Override
    public boolean update(Log log, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }
}
