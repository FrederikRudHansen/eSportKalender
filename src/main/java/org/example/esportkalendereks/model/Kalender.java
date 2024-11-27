package org.example.esportkalendereks.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Kalender {

    @Id
    int id;
    String træning;
    LocalDate dato;
    String turnering;

    //MANGLER FK til holdID, og Spil
}
