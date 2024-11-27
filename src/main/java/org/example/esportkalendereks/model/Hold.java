package org.example.esportkalendereks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Hold {

    @Id
    int holdID;
    String navn;
    String rank;
    String nationalitet;
    int antal;

    // MANGLER FK til coach, player og spil
}
