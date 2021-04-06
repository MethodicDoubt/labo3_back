package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.model.exceptionHandler.ProductNotFoundException;

import java.util.List;

public interface Crudable<ENTITY, DTO, ID> {
    List<DTO> getAll();

    DTO getById(ID id);

    boolean insert(ENTITY entity);

    boolean update(ENTITY entity, ID id);

    boolean delete(ID id) throws ProductNotFoundException;
}
