package be.technifutur.Labo3.model.exceptionHandler;


import java.time.Instant;
import java.util.NoSuchElementException;

public class LogNotFoundException extends NoSuchElementException {

    private String message;

    private Instant timestamp = Instant.now();

    public LogNotFoundException(String message) {

        super(message);

    }
    
}
