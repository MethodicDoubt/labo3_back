package be.technifutur.Labo3.controllers;

import be.technifutur.Labo3.model.dtos.SupplierDto;
import be.technifutur.Labo3.model.entities.Supplier;
import be.technifutur.Labo3.model.services.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin
@RequestMapping("suppliers")
public class SupplierController implements RestControllable<Supplier, SupplierDto, Integer> {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @Override
    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAll() {
        return ResponseEntity.ok(this.supplierService.getAll());
    }

    @GetMapping("/companyName")
    public ResponseEntity<List<String>> getAllCompanyName() {
        return ResponseEntity.ok(this.supplierService.getAllCompanyName());
    }

    @Override
    @GetMapping(path = "/{id}")
    public ResponseEntity<SupplierDto> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(this.supplierService.getById(id));
    }

    @Override
    @PostMapping
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<Boolean> insert(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(this.supplierService.insert(supplier));
    }


    @Override
    @PutMapping(path = "/{id}")
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    public ResponseEntity<Boolean> update(@RequestBody Supplier supplier, @PathVariable Integer id) {
        return ResponseEntity.ok(this.supplierService.update(supplier, id));
    }

    @Override
    public ResponseEntity<Boolean> delete(Integer integer) {
        return null;
    }
}
