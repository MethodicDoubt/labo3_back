package be.technifutur.Labo3.model.exceptionHandler;

import java.util.NoSuchElementException;

public class OrderNotFoundException extends NoSuchElementException {

    public OrderNotFoundException(String s) {

        super(s);

    }

}
