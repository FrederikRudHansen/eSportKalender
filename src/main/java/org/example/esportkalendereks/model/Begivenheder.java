package org.example.esportkalendereks.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Begivenheder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatisk generering af ID
    private int id;

    @Enumerated(EnumType.STRING) // Enum gemmes som streng i databasen
    private TurneringTræning type;

    private LocalDate dato;
    private String description;
    private String titel;
    private LocalDateTime starttid;
    private LocalDateTime sluttid;

    // Relation til Hold
    @ManyToOne
    @JoinColumn(name = "hold_id", nullable = false)
    private Hold hold;

    public enum TurneringTræning {Turnering, Træning}

    // Getters og Setters
    public int getId() {
        return id;
    }


    public TurneringTræning getType() {
        return type;
    }

    public void setType(TurneringTræning type) {
        this.type = type;
    }

    public LocalDate getDato() {
        return dato;
    }

    public void setDato(LocalDate dato) {
        this.dato = dato;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public LocalDateTime getStarttid() {
        return starttid;
    }

    public void setStarttid(LocalDateTime starttid) {
        this.starttid = starttid;
    }

    public LocalDateTime getSluttid() {
        return sluttid;
    }

    public void setSluttid(LocalDateTime sluttid) {
        this.sluttid = sluttid;
    }

    public Hold getHold() {
        return hold;
    }

    public void setHold(Hold hold) {
        this.hold = hold;
    }
}