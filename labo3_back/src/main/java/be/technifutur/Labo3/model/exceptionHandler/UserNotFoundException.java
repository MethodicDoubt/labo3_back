package be.technifutur.Labo3.model.exceptionHandler;

import java.util.NoSuchElementException;

public class UserNotFoundException extends NoSuchElementException {

    public UserNotFoundException(String s) {
        super(s);
    }

}
