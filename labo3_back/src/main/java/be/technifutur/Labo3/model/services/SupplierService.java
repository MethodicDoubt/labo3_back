package be.technifutur.Labo3.model.services;

import be.technifutur.Labo3.mapper.Mapper;
import be.technifutur.Labo3.model.dtos.SupplierDto;
import be.technifutur.Labo3.model.entities.Supplier;
import be.technifutur.Labo3.model.exceptionHandler.SupplierNotFoundException;
import be.technifutur.Labo3.model.repositories.SupplierRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class SupplierService implements Crudable<Supplier, SupplierDto, Integer> {

    private SupplierRepository supplierRepository;
    private Mapper mapper;

    public SupplierService(SupplierRepository supplierRepository, Mapper mapper) {
        this.supplierRepository = supplierRepository;
        this.mapper = mapper;
    }

    @Override
    public List<SupplierDto> getAll() {

        return this.supplierRepository.findAll()
                .stream()
                .map(supplier -> mapper.toSupplierDto(supplier))
                .collect(Collectors.toList());

    }

    public List<String> getAllCompanyName() {
        return this.supplierRepository.findAllByCompanyName();
    }

    @Override
    public SupplierDto getById(Integer integer) {

        Supplier supplier = this.supplierRepository.findById(integer).orElseThrow(() -> new SupplierNotFoundException("No supplier found with this ID"));

        return mapper.toSupplierDto(supplier);

    }

    @Override
    public boolean insert(Supplier supplier) {
        supplier.setInsertionDate(Instant.now());
        supplier.setUpdateDate(Instant.now());
        Supplier newSupplier = this.supplierRepository.save(supplier);

        return this.supplierRepository.findById(newSupplier.getSupplierId()).isPresent();

    }

    @Override
    public boolean update(Supplier supplier, Integer integer) {

        Supplier oldSupplier = this.supplierRepository.getOne(integer);

        Supplier newSupplier = new Supplier(oldSupplier.getSupplierId(),
                oldSupplier.getCompanyName(),
                oldSupplier.getJuridicalStatus(),
                oldSupplier.getSector(),
                oldSupplier.getInsertionDate(),
                oldSupplier.getUpdateDate());

        supplier.setUpdateDate(Instant.now());
        supplier.setSupplierId(integer);

        this.supplierRepository.save(supplier);

        return !newSupplier.equals(this.supplierRepository.getOne(integer));

    }

    @Override
    public boolean delete(Integer integer) {

        this.supplierRepository.deleteById(integer);

        return this.supplierRepository.findById(integer).isEmpty();

    }

}
