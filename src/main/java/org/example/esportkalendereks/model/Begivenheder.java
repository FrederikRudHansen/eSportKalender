package org.example.esportkalendereks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Begivenheder {

    @Id
    int id;
    enum TurneringTræning {Turnering, Træning}
    LocalDate dato;
    String description;
    String titel;
    LocalDateTime starttid;
    LocalDateTime sluttid;

    //MANGLER FK til Kalenderid og spil
}
