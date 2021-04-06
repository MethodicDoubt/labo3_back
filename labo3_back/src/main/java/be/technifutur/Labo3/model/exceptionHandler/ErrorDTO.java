package be.technifutur.Labo3.model.exceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDTO {

    String message;

    Instant timestamp = Instant.now();

    public ErrorDTO(String message) {
        this.message = message;
    }

}
