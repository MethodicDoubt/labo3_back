package be.technifutur.Labo3.model.exceptionHandler;

import java.util.NoSuchElementException;

public class ProductNotFoundException extends NoSuchElementException {

    public ProductNotFoundException(String s) {

        super(s);

    }

}
