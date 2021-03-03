package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.SupplierDto;
import be.technifutur.Labo3.model.entities.Supplier;
import be.technifutur.Labo3.model.services.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("suppliers")
public class SupplierController implements RestControllable<Supplier, SupplierDto, Integer> {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @Override
    public ResponseEntity<List<SupplierDto>> getAll() {
        return null;
    }

    @GetMapping("/companyName")
    public ResponseEntity<List<String>> getAllCompanyName() {
        return ResponseEntity.ok(this.supplierService.getAllCompanyName());
    }

    @Override
    public ResponseEntity<SupplierDto> getOne(Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> insert(Supplier supplier) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> update(Supplier supplier, Integer integer) {
        return null;
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }
}
