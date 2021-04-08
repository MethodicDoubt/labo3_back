package be.technifutur.Labo3.config;

import be.technifutur.Labo3.model.entities.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            User credsUser = new ObjectMapper().readValue(request.getInputStream(), User.class);
            return this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credsUser.getUsername(),
                            credsUser.getPassword(),
                            credsUser.getAuthorities()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String token = JWT.create()
                .withSubject(
                        ((User) authResult.getPrincipal()).getUsername()
                )
                .withExpiresAt(
                        new Date(System.currentTimeMillis() + JWTConstants.EXPIRATION_TIME)
                )
                .sign(Algorithm.HMAC512(JWTConstants.SECRET_KEY));

        response.addHeader(JWTConstants.HEADER_STRING, "Bearer " + token);
    }

    static class JWTConstants {
        static final long EXPIRATION_TIME = 86400000; //24heure
        static final String SECRET_KEY = "$2y$12$gZEL8IdWPWLA3bWCulBKIuzAib53NgUMuRfH7FXei2rxv4g.Io46m";
        static final String HEADER_STRING = "Authorization";
    }
}
