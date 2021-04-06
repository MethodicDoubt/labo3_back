package be.technifutur.Labo3.model.exceptionHandler;

import java.time.Instant;
import java.util.NoSuchElementException;

public class NoSuchCategoryException extends NoSuchElementException {

    public NoSuchCategoryException(String message) {

        super(message);

    }

}
