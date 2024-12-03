package org.example.esportkalendereks.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Begivenheder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private TurneringTræning type;

    private LocalDateTime dato;
    private String description;
    private String titel;
    private LocalDateTime starttid;
    private LocalDateTime sluttid;

    @ManyToOne
    @JoinColumn(name = "hold_id", nullable = false)
    private Hold hold;

    public enum TurneringTræning {Turnering, Træning}
}
