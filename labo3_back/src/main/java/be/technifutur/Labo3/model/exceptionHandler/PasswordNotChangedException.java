package be.technifutur.Labo3.model.exceptionHandler;

public class PasswordNotChangedException extends Exception {
    public PasswordNotChangedException(String message) {
        super(message);
    }
}
