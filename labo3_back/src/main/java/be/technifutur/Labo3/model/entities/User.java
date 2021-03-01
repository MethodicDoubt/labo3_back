package be.technifutur.Labo3.model.entities;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer userId;

    @Column(nullable = false, length = 50)
    String lastName;

    @Column(nullable = false, length = 50)
    String firstName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    be.technifutur.Labo3.model.types.AccessLevel accessLevel;

    @Column(nullable = false, unique = true, length = 50)
    String surname;

    @Column(nullable = false, length = 50)
    String password;

    @Embedded
    Address address;

    @OneToMany(mappedBy = "user")
    List<Order> orders;

    @Column
    Byte[] avatar;

}
