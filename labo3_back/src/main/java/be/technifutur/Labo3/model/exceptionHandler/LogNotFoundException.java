package be.technifutur.Labo3.model.exceptionHandler;


import java.time.Instant;
import java.util.NoSuchElementException;

public class LogNotFoundException extends NoSuchElementException {

    public LogNotFoundException(String message) {

        super(message);

    }
    
}
