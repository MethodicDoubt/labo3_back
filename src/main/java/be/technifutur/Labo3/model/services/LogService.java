package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.model.dtos.LogDto;
import be.technifutur.Labo3.model.entities.Log;

import java.util.List;

public class LogService implements Crudable<Log, LogDto,Integer> {
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
