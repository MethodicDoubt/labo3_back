package be.technifutur.Labo3.model.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@EqualsAndHashCode
@Entity
//changer nom en DB
@Table(name = "application_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer userId;

    @Column(length = 50)
    String lastName;

    @Column(length = 50)
    String firstName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    be.technifutur.Labo3.model.types.AccessLevel accessLevel;

    @Column(nullable = false, unique = true, length = 50)
    String surname;

    @Column(nullable = false)
    String password;

    @Embedded
    Address address;

    @OneToMany(mappedBy = "user")
    List<Order> orders;

    @Column
    Byte[] avatar;

    //Security
    @Column(nullable = false)
    boolean isAccountNonExpired = true;
    @Column(nullable = false)
    boolean isAccountNonLocked = true;
    @Column(nullable = false)
    boolean isCredentialsNonExpired = true;
    @Column(nullable = false)
    boolean isEnabled = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority role = new SimpleGrantedAuthority(accessLevel.name());
        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        roles.add(role);
        return roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.surname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}
