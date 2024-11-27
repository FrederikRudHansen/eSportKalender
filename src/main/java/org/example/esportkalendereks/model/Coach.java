package org.example.esportkalendereks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Coach {

    @Id
    int ID;
    String email;
    int holdID;
    String spil;
    String navn;
    int alder;
    String præferencer;
    String resume;
    String billede;
    String nationalitet;
}
