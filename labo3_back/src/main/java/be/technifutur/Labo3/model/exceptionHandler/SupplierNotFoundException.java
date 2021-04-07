package be.technifutur.Labo3.model.exceptionHandler;

import java.util.NoSuchElementException;

public class SupplierNotFoundException extends NoSuchElementException {

    public SupplierNotFoundException(String s) {
        super(s);
    }

}
